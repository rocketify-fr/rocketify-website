import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'

import BlogPost from '~/components/blog/BlogPost'
import Container from '~/components/Container'
import { Loading } from '~/components/Loading'
import PageComponent from '~/components/Page'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { APP_QUERY } from '~/sanity/queries'
import { getLanguage } from '~/utils/language'

// Load the `record` document with this slug
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const language = getLanguage(params)
  const { options } = await loadQueryOptions(request.headers)

  const query = APP_QUERY
  const initial = await loadQuery(query, { ...params, language }, options).then(
    (res) => ({ ...res, data: res.data ? res.data : null })
  )
  if (!initial.data) {
    throw new Response('Not found', { status: 404 })
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

export default function AppPage() {
  const { initial, query, params } = useLoaderData<typeof loader>()

  if (!initial.data) {
    return <div>Not found</div>
  }

  return <PageComponent {...initial.data}></PageComponent>
}
