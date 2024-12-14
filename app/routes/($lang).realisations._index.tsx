import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'

import { PostContent } from '~/components/content/PostContent'
import { Loading } from '~/components/Loading'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { PAGE_QUERY, USE_CASES_QUERY } from '~/sanity/queries'
import { getLanguage } from '~/utils/language'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers)
  const query = USE_CASES_QUERY
  const language = getLanguage(params)
  const queryParams = { language }

  const [initial, { data: pageData }] = await Promise.all([
    loadQuery(query, queryParams, options),
    loadQuery(PAGE_QUERY, { slug: 'realisations', language }, options),
  ])

  if (!initial.data) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    initial,
    pageData,
    query,
    params: queryParams,
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data.pageData.seo.title },
    { name: 'description', content: data.pageData.seo.description },
  ]
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading, encodeDataAttribute } = useQuery<typeof initial.data>(
    query,
    params,
    {
      // There's a TS issue with how initial comes over the wire
      // @ts-expect-error
      initial,
    }
  )

  const { pageData } = useLoaderData()

  if (loading && !data) {
    return <Loading />
  } else if (!data || !initial.data) {
    return <div>Not found</div>
  }

  return <PostContent content={pageData.content}></PostContent>
}
