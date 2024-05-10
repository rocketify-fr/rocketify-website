import type {ActionFunction, LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'
import ContactForm from '~/components/ContactForm'

import {Loading} from '~/components/Loading'
import PageComponent from '~/components/Page'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions.server'
import {HOMEPAGE_QUERY, RECORDS_QUERY} from '~/sanity/queries'
import type {RecordStub} from '~/types/record'
import {recordStubsZ} from '~/types/record'

// Perform a `like` or `dislike` mutation on a `record` document
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 })
  }

  // const writeClient = client.withConfig({
  //   useCdn: false,
  //   token: process.env.SANITY_WRITE_TOKEN,
  // })
  // const { token, projectId } = writeClient.config()
  //
  // if (!token) {
  //   throw new Response(
  //     `Setup "SANITY_WRITE_TOKEN" with a token with "Editor" permissions to your environment variables. Create one at https://sanity.io/manage/project/${projectId}/api#tokens`,
  //     { status: 401 },
  //   )
  // }
  //
  const body = await request.formData()

  for (const [key, value] of body.entries()) {
    console.log({key, value});
  }

  return null
  // const id = String(body.get('id'))
  // const action = String(body.get('action'))
  //
  // if (id) {
  //   switch (action) {
  //     case 'LIKE':
  //       return await writeClient
  //         .patch(id)
  //         .setIfMissing({ likes: 0 })
  //         .inc({ likes: 1 })
  //         .commit()
  //         .then(({ likes, dislikes }) => ({
  //           likes: likes ?? 0,
  //           dislikes: dislikes ?? 0,
  //         }))
  //     case 'DISLIKE':
  //       return await writeClient
  //         .patch(id)
  //         .setIfMissing({ dislikes: 0 })
  //         .inc({ dislikes: 1 })
  //         .commit()
  //         .then(({ likes, dislikes }) => ({
  //           likes: likes ?? 0,
  //           dislikes: dislikes ?? 0,
  //         }))
  //     default:
  //       return json({ message: 'Invalid action' }, 400)
  //   }
  // }
  //
  // return json({ message: 'Bad request' }, 400)
}



export const loader = async ({request}: LoaderFunctionArgs) => {
  const {options} = await loadQueryOptions(request.headers)
  const query = HOMEPAGE_QUERY
  const queryParams = {}
  const initial = await loadQuery<RecordStub[]>(
    query,
    queryParams,
    options,
  )

  if (!initial.data) {
    throw new Response('Not found', {status: 404})
  }

  return json({
    initial,
    query,
    params: queryParams,
  })
}

export default function Contact() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading, encodeDataAttribute} = useQuery<typeof initial.data>(
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
    return <div>Not found</div>
  }

  const pageData = data?.[0] || initial.data[0]

  return (
    <ContactForm></ContactForm>
  )
}

