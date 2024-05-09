import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { loadQuery, useQuery } from '@sanity/react-loader'

import {themePreferenceCookie} from '~/cookies'
import {getBodyClassNames} from '~/lib/getBodyClassNames'
import styles from '~/tailwind.css?url'
import {themePreference} from '~/types/themePreference'
import { loadQueryOptions } from './sanity/loadQueryOptions.server'
import { LAYOUT_QUERY } from './sanity/queries'
import { Header } from './components/Header'
import { Page } from './components/Container'
import { Footer } from './components/Footer'
import { VisualEditing } from '@sanity/visual-editing/remix'
import { ExitPreview } from './components/ExitPreview'

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'preconnect', href: 'https://cdn.sanity.io'},
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@500&family=Work+Sans:wght@400;500&display=swap',
      rel: 'stylesheet',
    },
  ]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  // Dark/light mode
  const { preview, options } = await loadQueryOptions(request.headers)
  const cookieHeader = request.headers.get('Cookie')
  const cookieValue = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const theme = themePreference.parse(cookieValue.themePreference) || 'light'
  const bodyClassNames = getBodyClassNames(theme)

  const query = LAYOUT_QUERY
  const params = {}
  const initial = await loadQuery(query, params, options)

  return json({
    initial,
    query,
    params,
    sanity: { preview },
    theme,
    bodyClassNames,
    ENV: {
      VITE_SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID!,
      VITE_SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET!,
      VITE_SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION!,
    },
  })
}

export default function App() {
  const {theme, bodyClassNames, ENV} = useLoaderData<typeof loader>()
  const { initial, query, params, sanity } = useLoaderData<typeof loader>()
  const {
    data: { footer, header },
  } = useQuery<typeof initial.data>(query, params, {
    // There's a TS issue with how initial comes over the wire
    // @ts-expect-error
    initial,
  })

  return (
    <html lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="https://fav.farm/🤘" />
        <Links />
      </head>
      <body className={bodyClassNames}>
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
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}
