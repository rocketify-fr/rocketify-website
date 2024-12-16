import type { ActionFunction, LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

import ContactForm from '~/components/ContactForm'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { HOMEPAGE_QUERY, SERVICE_NAMES_QUERY } from '~/sanity/queries'
import { languages } from '~/sanity/structure'
import { getLanguage } from '~/utils/language'

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 })
  }

  const body = await request.formData()

  for (const [key, value] of body.entries()) {
    console.log({ key, value })
  }

  return null
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const language = getLanguage(params)
  const { options } = await loadQueryOptions(request.headers)
  const query = HOMEPAGE_QUERY
  const queryParams = { language }
  const { data: services } = await loadQuery(
    SERVICE_NAMES_QUERY,
    queryParams,
    options
  )

  if (!services.length) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    pageData: {
      translations: languages.map((lang) => ({
        language: lang.id,
        slug: 'contact',
      })),
    },
    services,
    query,
    params: queryParams,
  })
}

export default function Contact() {
  return <ContactForm></ContactForm>
}
