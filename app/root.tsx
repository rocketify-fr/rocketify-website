import 'react-toastify/dist/ReactToastify.css'

import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { loadQuery, useQuery } from '@sanity/react-loader'
import { VisualEditing } from '@sanity/visual-editing/remix'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { ToastContainer } from 'react-toastify'

import { themePreferenceCookie } from '~/cookies'
import { getBodyClassNames } from '~/lib/getBodyClassNames'
import styles from '~/tailwind.css?url'
import { themePreference } from '~/types/themePreference'

import { Page } from './components/Container'
import { TranslationsProvider } from './components/contexts/translations'
import { ExitPreview } from './components/ExitPreview'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { loadQueryOptions } from './sanity/loadQueryOptions.server'
import { LAYOUT_QUERY } from './sanity/queries'
import { extendedLanguages, getLanguage } from './utils/language'
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from './utils/opengraph'

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

  const { preview, options } = await loadQueryOptions(request.headers)
  const cookieHeader = request.headers.get('Cookie')
  const cookieValue = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const theme = themePreference.parse(cookieValue.themePreference) || 'light'
  const bodyClassNames = getBodyClassNames(theme)

  const language = getLanguage(requestParams)

  // console.log(requestParams)

  const langSuffix = extendedLanguages.find((l) => l.id === language)?.camelId

  const header = `header${langSuffix}`
  const footer = `footer${langSuffix}`
  const query = LAYOUT_QUERY
  const params = { language, header, footer }
  const initial = await loadQuery(query, params, options)

  const { translations } = initial?.data
  initial.data.translations = undefined

  const result = {
    url: url.toString(),
    translations,
    initial,
    query,
    params,
    language,
    sanity: { preview: false },
    theme,
    bodyClassNames,
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
  const { theme, bodyClassNames, initial, query, params, sanity } =
    useLoaderData<typeof loader>()

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
        <link rel='icon' href='/favicon.png' />
        <Links />
      </head>
      <body className={bodyClassNames}>
        <TranslationsProvider>
          <div className='flex min-h-dvh flex-col justify-between'>
            <Header theme={theme} data={header} />

            <Page>
              <ToastContainer></ToastContainer>
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
        <ScrollRestoration />
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
