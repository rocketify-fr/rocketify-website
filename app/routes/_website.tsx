import type { LoaderFunctionArgs } from '@remix-run/node'
import {
  json,
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
} from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import { VisualEditing } from '@sanity/visual-editing/remix'
import { Page } from '~/components/Container'

import { ExitPreview } from '~/components/ExitPreview'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { loadQuery } from '~/sanity/loader.server'
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server'
import { HOME_QUERY } from '~/sanity/queries'
import type { ThemePreference } from '~/types/themePreference'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { preview, options } = await loadQueryOptions(request.headers)

  // Sanity content reused throughout the site
  const query = HOME_QUERY
  const params = {}
  const initial = await loadQuery(query, params, options)

  return json({
    initial,
    query,
    params,
    sanity: { preview },
  })
}

export default function Website() {
  const { initial, query, params, sanity } = useLoaderData<typeof loader>()
  const {
    data: { footer, header },
  } = useQuery<typeof initial.data>(query, params, {
    // There's a TS issue with how initial comes over the wire
    // @ts-expect-error
    initial,
  })
  const { pathname } = useLocation()
  const { theme } = useOutletContext<{ theme: ThemePreference }>()

  return (
    <div className="min-h-dvh flex flex-col justify-between">
      <Header theme={theme} data={header} />
      <Page>
        {/* home?.title && pathname === '/' ? <Title>{home?.title}</Title> : null */}
        <Outlet />
      </Page>
      <Footer data={footer} />
      {sanity.preview ? (
        <>
          <VisualEditing />
          <ExitPreview />
        </>
          ) : null}
    </div>
  )
}
