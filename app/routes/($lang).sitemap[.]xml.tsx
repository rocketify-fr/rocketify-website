// app/routes/sitemap[.]xml.ts
import { LoaderFunctionArgs } from '@remix-run/node'
import { loadQuery } from '@sanity/react-loader'

import { translations } from '~/sanity/queries'
import { getLanguage } from '~/utils/language'

const BASE_URL = 'https://rocketify.io'

/* -------------------------------------------------------------------------- */
/*  Loader                                                                    */
/* -------------------------------------------------------------------------- */
export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const language = getLanguage(params)
    const data = await fetchDataFromSanity(language)

    const allItems = [
      ...data.pages,
      ...data.posts,
      ...data.services,
      ...data.useCases,
    ]

    const xml = buildSitemapXml(allItems, language)

    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
  } catch (error) {
    console.error('[/sitemap.xml] ', error)
    return new Response('Internal Server Error', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}

/* -------------------------------------------------------------------------- */
/*  Sanity                                                                    */
/* -------------------------------------------------------------------------- */
async function fetchDataFromSanity(language: string) {
  const query = /* groq */ `
  {
    "pages": *[
      _type == "page" &&
      defined(slug.current) &&
      !(_id in path('drafts.**')) &&
      publishStatus == "public" &&
      language == $language
    ]{
      "slug": slug.current,
      _updatedAt,
      ${translations}
    },
    "posts": *[_type == "post" && publishStatus == "public" && language == $language]{
      "slug": "blog/" + slug.current,
      _updatedAt,
      ${translations}
    },
    "services": *[_type == "service" && publishStatus == "public" && language == $language]{
      "slug": "services/" + slug.current,
      _updatedAt,
      ${translations}
    },
    "useCases": *[_type == "useCase" && publishStatus == "public" && language == $language]{
      "slug": "realisation/" + slug.current,
      _updatedAt,
      ${translations}
    }
  }`

  const { data } = await loadQuery(query, { language })
  return data
}

/* -------------------------------------------------------------------------- */
/*  XML builder                                                               */
/* -------------------------------------------------------------------------- */
function buildSitemapXml(
  allItems: Array<{
    slug: string
    _updatedAt: string
    translations?: Array<{ language: string; slug: string }>
  }>,
  language: string
) {
  const langPrefix = language === 'fr' ? '' : `/${language}`

  const nodes = allItems.map((doc) => {
    const isHome = doc.slug === '/'
    const slugPath = isHome ? '' : `/${doc.slug}`
    const url = `${BASE_URL}${langPrefix}${slugPath}`

    const alternates =
      doc.translations?.map((t) => {
        const altPrefix = t.language === 'fr' ? '' : `/${t.language}`
        const altSlug =
          t.slug && slugPath
            ? slugPath.replace(slugPath.split('/').pop()!, t.slug)
            : slugPath
        return `<xhtml:link rel="alternate" hreflang="${t.language}" href="${BASE_URL}${altPrefix}${altSlug}" />`
      }) ?? []

    return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date(doc._updatedAt).toISOString()}</lastmod>
    <priority>${isHome ? '1.00' : '0.80'}</priority>
    ${alternates.join('\n    ')}
  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${nodes.join('')}
</urlset>`
}

/* -------------------------------------------------------------------------- */
