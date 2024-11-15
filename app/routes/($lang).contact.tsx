import type { ActionFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import ContactForm from '~/components/ContactForm'

import { Loading } from '~/components/Loading'
import NotFound from '~/components/NotFound'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { HOMEPAGE_QUERY, SERVICE_NAMES_QUERY } from '~/sanity/queries'
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
  const {data: services} = await loadQuery(
    SERVICE_NAMES_QUERY,
    queryParams,
    options,
  )

  if (!services.length) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    services,
    query,
    params: queryParams,
  })
}

export default function Contact() {
  return (
    <ContactForm></ContactForm>
  )
}

