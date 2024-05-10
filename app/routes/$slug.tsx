import type {
  ActionFunction,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'

import { Loading } from '~/components/Loading'
import NotFound from '~/components/NotFound'
import { Record } from '~/components/Record'
import { client } from '~/sanity/client'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { RECORD_QUERY } from '~/sanity/queries'
import { type RecordDocument, recordZ } from '~/types/record'


// Perform a `like` or `dislike` mutation on a `record` document
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 })
  }

  const writeClient = client.withConfig({
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
  })
  const { token, projectId } = writeClient.config()

  if (!token) {
    throw new Response(
      `Setup "SANITY_WRITE_TOKEN" with a token with "Editor" permissions to your environment variables. Create one at https://sanity.io/manage/project/${projectId}/api#tokens`,
      { status: 401 },
    )
  }

  const body = await request.formData()
  const id = String(body.get('id'))
  const action = String(body.get('action'))

  if (id) {
    switch (action) {
      case 'LIKE':
        return await writeClient
          .patch(id)
          .setIfMissing({ likes: 0 })
          .inc({ likes: 1 })
          .commit()
          .then(({ likes, dislikes }) => ({
            likes: likes ?? 0,
            dislikes: dislikes ?? 0,
          }))
      case 'DISLIKE':
        return await writeClient
          .patch(id)
          .setIfMissing({ dislikes: 0 })
          .inc({ dislikes: 1 })
          .commit()
          .then(({ likes, dislikes }) => ({
            likes: likes ?? 0,
            dislikes: dislikes ?? 0,
          }))
      default:
        return json({ message: 'Invalid action' }, 400)
    }
  }

  return json({ message: 'Bad request' }, 400)
}

// Load the `record` document with this slug
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers)

  const query = RECORD_QUERY
  const initial = await loadQuery<RecordDocument>(
    query,
    // $slug.tsx has the params { slug: 'hello-world' }
    params,
    options,
  ).then((res) => ({ ...res, data: res.data ? recordZ.parse(res.data) : null }))

  if (!initial.data) {
    return <NotFound />
  }

  // Create social share image url
  const { origin } = new URL(request.url)
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`

  return {
    initial,
    query,
    params,
    ogImageUrl,
  }
}

export default function RecordPage() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading, encodeDataAttribute } = useQuery<typeof initial.data>(
    query,
    params,
    {
      // There's a TS issue with how initial comes over the wire
      // @ts-expect-error
      initial,
    },
  )

  if (loading && !data) {
    return <Loading />
  } else if (!data || !initial.data) {
    return <NotFound />
  }

  return (
    <Record
      data={data || initial.data}
      encodeDataAttribute={encodeDataAttribute}
    />
  )
}
