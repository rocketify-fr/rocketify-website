import type { ActionFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import ContactForm from '~/components/ContactForm'

import { Loading } from '~/components/Loading'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { HOMEPAGE_QUERY } from '~/sanity/queries'
import type { RecordStub } from '~/types/record'

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 })
  }

  const body = await request.formData()

  for (const [key, value] of body.entries()) {
    console.log({ key, value });
  }

  return null
}



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers)
  const query = HOMEPAGE_QUERY
  const queryParams = {}
  const initial = await loadQuery<RecordStub[]>(
    query,
    queryParams,
    options,
  )

  if (!initial.data) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    initial,
    query,
    params: queryParams,
  })
}

export default function Contact() {
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
    return <div>Not found</div>
  }

  const pageData = data?.[0] || initial.data[0]

  return (
    <ContactForm></ContactForm>
  )
}

