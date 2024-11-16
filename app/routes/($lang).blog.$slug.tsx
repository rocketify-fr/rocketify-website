import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'
import BlogPost from '~/components/blog/BlogPost'

import {Loading} from '~/components/Loading'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions.server'
import {POST_QUERY} from '~/sanity/queries'
import { getLanguage } from '~/utils/language'

// Load the `record` document with this slug
export const loader = async ({params, request}: LoaderFunctionArgs) => {
  const lang = getLanguage(params)
  const {options} = await loadQueryOptions(request.headers)

  const query = POST_QUERY
  const initial = await loadQuery(
    query,
    {...params, lang},
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const metaTags = [
    { title: data.initial?.data?.seo?.title },
    { name: 'description', content: data.initial?.data?.seo?.description },
  ];
  
  const publishStatus = data?.initial?.data?.publishStatus?.replace(/[^\x20-\x7E]/g, '').trim();
  
  if (publishStatus === "hidden") {
    metaTags.push({ name: 'robots', content: 'noindex' });
  }

  return metaTags;
};

export default function PostPage() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading, encodeDataAttribute} = useQuery<typeof initial.data>(
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
    <BlogPost
      post={data || initial.data}
    />
  )
}
