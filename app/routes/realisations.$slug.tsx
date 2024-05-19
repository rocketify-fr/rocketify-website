import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'

import {Loading} from '~/components/Loading'
import RealisationPost from '~/components/realisations/RealisationPost'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions.server'
import {USE_CASE_QUERY} from '~/sanity/queries'

// Load the `record` document with this slug
export const loader = async ({params, request}: LoaderFunctionArgs) => {
  const {options} = await loadQueryOptions(request.headers)

  const query = USE_CASE_QUERY
  const initial = await loadQuery(
    query,
    // $slug.tsx has the params { slug: 'hello-world' }
    params,
    options,
  ).then((res) => ({...res, data: res.data ? res.data : null}))
  if (!initial.data) {
    throw new Response('Not found', {status: 404})
  }

  // Create social share image url
  const {origin} = new URL(request.url)
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`

  return {
    initial,
    query,
    params,
    ogImageUrl,
  }
}

export const meta: MetaFunction<typeof loader> = ({
  data,
}) => {
  return [{ title: data.initial.data.seo.title }, {name: 'description', content:data.initial.data.seo.description }];
};

export default function PostPage() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading} = useQuery<typeof initial.data>(
    query,
    params,
    {
      // There's a TS issue with how initial comes over the wire
      // @ts-expect-error
      initial,
    },
  )

  if (loading && !data) {
    return <Loading />
  } else if (!data || !initial.data) {
    return <div>Not found</div>
  }

  return (
    <RealisationPost
      post={data || initial.data}
    />
  )
}
