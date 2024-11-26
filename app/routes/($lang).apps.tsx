import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import PageComponent from '~/components/Page'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { APPS_QUERY, PAGE_QUERY } from '~/sanity/queries'
import { getLanguage } from '~/utils/language'

export const getSearchParams = ({ request, perPage }) => {
  const searchParams = new URL(request.url).searchParams

  const page = parseInt(searchParams.get('page'), 10) || 1
  const sort = searchParams.get('sort') || '_createdAt'
  const sortDirection = searchParams.get('sortDirection') || 'desc'

  const from = (page - 1) * perPage
  const to = perPage * page - 1

  console.log({ page, sort, sortDirection, from, to })

  return { sort, sortDirection, from, to }
}

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

  const perPage =
    initial.data.content.find((c) => c._type === 'appsGrid')?.perPage || 12

  const search = getSearchParams({ request, perPage })
  console.log({ search })

  const { data: appsData } = await loadQuery(
    APPS_QUERY,
    { ...search, language },
    options
  )

  console.log(JSON.stringify({ appsData }, null, 2))

  return json({
    initial,
    appsData,
    params: queryParams,
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.initial?.data?.seo?.title },
    { name: 'description', content: data?.initial?.data?.seo?.description },
  ]
}

export default function Index() {
  const { initial } = useLoaderData<typeof loader>()

  return <PageComponent {...initial.data} />
}
