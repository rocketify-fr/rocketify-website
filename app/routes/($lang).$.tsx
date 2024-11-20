import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'

import { Loading } from '~/components/Loading'
import NotFound from '~/components/NotFound'
import PageComponent from '~/components/Page'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { HOMEPAGE_QUERY, PAGE_QUERY } from '~/sanity/queries'
import type { RecordStub } from '~/types/record'
import { getLanguage } from '~/utils/language'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const language = getLanguage(params)
  const { options } = await loadQueryOptions(request.headers)
  const slug = new URL(request.url).pathname.slice(1)
  const query = PAGE_QUERY
  const queryParams = { slug, language }

  const initial = await loadQuery(query, queryParams, options)

  if (!initial.data) {
    return {
      notFound: true,
    }
  }

  return json({
    initial,
    query,
    params: queryParams,
  })
}
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const metaTags = [
    { title: data.initial?.data?.seo?.title },
    { name: 'description', content: data.initial?.data?.seo?.description },
  ]

  const publishStatus = data?.initial?.data?.publishStatus
    ?.replace(/[^\x20-\x7E]/g, '')
    .trim()

  if (publishStatus === 'hidden') {
    metaTags.push({ name: 'robots', content: 'noindex' })
  }

  return metaTags
}

export default function Index() {
  const { notFound, initial, query, params } = useLoaderData<typeof loader>()
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
  } else if (!data || !initial.data || notFound) {
    return <NotFound />
  }

  const pageData = data || initial.data

  return <PageComponent {...pageData} />
}
