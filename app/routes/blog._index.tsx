import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'

import { Loading } from '~/components/Loading'
import { Posts } from '~/components/post/Posts'
import type { loader as layoutLoader } from '~/root'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { POSTS_QUERY } from '~/sanity/queries'

export const meta: MetaFunction<
  typeof loader,
  {
    'root': typeof layoutLoader
  }
> = ({ matches }) => {
  const layoutData = matches.find(
    (match) => match.id === 'root'
  )?.data
  const home = layoutData ? layoutData.initial.data : null
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

  console.log({title});

  return [{ title }]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers)
  const query = POSTS_QUERY
  const queryParams = {}
  const initial = await loadQuery(query, queryParams, options).then((res) => ({
    ...res,
    data: res.data ? res.data : null,
  }))

  if (!initial.data) {
    throw new Response('Not found', { status: 404 })
  }

  return json({
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
    <Posts
      posts={data || initial.data}
      encodeDataAttribute={encodeDataAttribute}
    />
  )
}
