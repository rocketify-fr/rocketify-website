import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import PageComponent from '~/components/Page'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { PAGE_QUERY } from '~/sanity/queries'
import { getLanguage } from '~/utils/language'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers)
  const language = getLanguage(params)
  const queryParams = { language }

  const [initial] = await Promise.all([
    loadQuery(PAGE_QUERY, { slug: 'apps', language }, options),
  ])

  if (!initial.data) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    initial,
    params: queryParams,
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.pageData?.seo?.title },
    { name: 'description', content: data?.pageData?.seo?.description },
  ]
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()

  return <PageComponent {...initial.data} />
}
