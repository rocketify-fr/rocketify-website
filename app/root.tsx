import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import { loadQuery, useQuery } from '@sanity/react-loader'
import { VisualEditing } from '@sanity/visual-editing/remix'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

import { themePreferenceCookie } from '~/cookies'
import { getBodyClassNames } from '~/lib/getBodyClassNames'
import styles from '~/tailwind.css?url'
import { themePreference } from '~/types/themePreference'

import { Page } from './components/Container'
import { TranslationsProvider } from './components/contexts/translations'
import { ExitPreview } from './components/ExitPreview'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from './routes/resource.og'
import { loadQueryOptions } from './sanity/loadQueryOptions.server'
import { LAYOUT_QUERY } from './sanity/queries'
import { extendedLanguages, getLanguage, languages } from './utils/language'

const GTM_ID = 'GTM-T2JXGG9Q'

const tagManagerArgs = {
  gtmId: GTM_ID,
}

export const links: LinksFunction = () => {
  return [
    { rel: 'preload', href: styles, as: 'style' },
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://cdn.sanity.io' },
  ]
}

export const loader = async ({
  request,
  params: requestParams,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/fr')) {
    const newPath = url.pathname.split('/fr')[1]
    return redirect(newPath)
  }

  // Dark/light mode
  const { preview, options } = await loadQueryOptions(request.headers)
  const cookieHeader = request.headers.get('Cookie')
  const cookieValue = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const theme = themePreference.parse(cookieValue.themePreference) || 'light'
  const bodyClassNames = getBodyClassNames(theme)

  const language = getLanguage(requestParams)

  const langSuffix = extendedLanguages.find((l) => l.id === language).camelId

  const header = `header${langSuffix}`
  const footer = `footer${langSuffix}`
  const query = LAYOUT_QUERY
  const params = { language, header, footer }
  const initial = await loadQuery(query, params, options)

  const { translations } = initial?.data
  initial.data.translations = undefined

  const result = {
    translations,
    initial,
    query,
    params,
    language,
    sanity: { preview },
    theme,
    bodyClassNames,
    ENV: {
      VITE_SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID!,
      VITE_SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET!,
      VITE_SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION!,
    },
  }

  if (!languages.includes(language)) {
    result.notFound = true
  }

  return json(result)
}

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const layoutData = matches.find((match) => match.id === `root`)?.data

  const home = layoutData ? layoutData.initial.data : null

  const title = [data?.initial?.data?.title, home?.siteTitle]
    .filter(Boolean)
    .join(' | ')

  const ogImageUrl = data ? data.ogImageUrl : null

  const value = [
    { title },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { property: 'og:title', content: title },
    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
    { property: 'og:image', content: ogImageUrl },
  ]

  return value
}

export default function App() {
  const { theme, bodyClassNames, ENV, initial, query, params, sanity } =
    useLoaderData<typeof loader>()
  const location = useLocation()
  const isStudio = location.pathname.startsWith('/studio')
  const {
    data: { footer, header },
  } = useQuery<typeof initial.data>(query, params, {
    initial,
  })

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <html lang='en'>
      <head>
        <Meta />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
        <Links />
      </head>
      <body className={bodyClassNames}>
        {isStudio ? (
          <Outlet></Outlet>
        ) : (
          <TranslationsProvider>
            <div className='flex min-h-dvh flex-col justify-between'>
              <Header theme={theme} data={header} />

              <Page>
                <Outlet />
              </Page>
              <Footer data={footer}></Footer>
              {sanity.preview ? (
                <>
                  <VisualEditing />
                  <ExitPreview />
                </>
              ) : null}
            </div>
          </TranslationsProvider>
        )}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {/* GTM script fallback if js is disabled */}
        <noscript>
          <iframe
            height='0'
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            style={{ display: 'none', visibility: 'hidden' }}
            width='0'
          />
        </noscript>
        <Scripts />
      </body>
    </html>
  )
}
