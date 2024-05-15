
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'

import { Loading } from '~/components/Loading'
import RealisationsGrid from '~/components/realisations/RealisationsGrid'
import RealisationsPage from '~/components/realisations/RealisationsPage'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { PAGE_QUERY, USE_CASES_QUERY } from '~/sanity/queries'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers)
  const query = USE_CASES_QUERY
  const queryParams = {}

  const [initial, { data: pageData }] = await Promise.all([
    loadQuery(query, queryParams, options),
    loadQuery(PAGE_QUERY, { slug: 'realisations' }, options)
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

  if (loading && !data) {
    return <Loading />
  } else if (!data || !initial.data) {
    return <div>Not found</div>
  }

  return (
    <RealisationsPage />
  )
}
