import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'

import { Loading } from '~/components/Loading'
import PageComponent from '~/components/Page'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { HOMEPAGE_QUERY } from '~/sanity/queries'
import type { RecordStub } from '~/types/record'
import { getLanguage } from '~/utils/language'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const language = getLanguage(params)
  const { options } = await loadQueryOptions(request.headers)
  const query = HOMEPAGE_QUERY
  const queryParams = { language }
  const initial = await loadQuery<RecordStub[]>(query, queryParams, options)

  if (!initial.data) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    initial,
    query,
    params: queryParams,
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data.initial.data.seo.title },
    { name: 'description', content: data.initial.data.seo.description },
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

  if (loading && !data) {
    return <Loading />
  } else if (!data || !initial.data) {
    return <div>Not found</div>
  }

  const pageData = data || initial.data

  return <PageComponent {...pageData} />
}
