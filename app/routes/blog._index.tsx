import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import queryString from 'query-string'
import BlogPosts from '~/components/blog/BlogPosts'

import { Loading } from '~/components/Loading'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { PAGE_QUERY, POST_TAGS_QUERY, POSTS_QUERY, POSTS_QUERY_TAG } from '~/sanity/queries'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers)

  const [{ data: pageData }, {data: tagsData}] = await Promise.all([
    loadQuery(PAGE_QUERY, { slug: 'blog' }, options),
    loadQuery(POST_TAGS_QUERY)
  ])

  const gridConfig = pageData.content.find(item => item._type === "blogPostsGrid")

  const postsPerPage = gridConfig?.perPage || 10

  const { tag, page, sortBy } = queryString.parse(new URL(request.url).search)

  const order = sortBy || 'new'

  const query = tag?.length > 0 ? POSTS_QUERY_TAG : POSTS_QUERY

  const queryParams = {
    from: postsPerPage * ((+page || 1) - 1),
    to: postsPerPage * (+page || 1),
    order,
    tag
  }


  const initial = await loadQuery(query, queryParams, options).then((res) => ({
    ...res,
    data: res.data ? res.data : null,
  }))

  if (!initial.data) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
    pageData,
    tagsData,
    initial,
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
    <BlogPosts />
  )
}
