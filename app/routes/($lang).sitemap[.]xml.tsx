// app/routes/sitemap[.]xml.js
import { json } from '@remix-run/node'
import { loadQuery } from '@sanity/react-loader'

import { translations } from '~/sanity/queries'
import { getLanguage } from '~/utils/language'

const baseUrl = 'https://rocketify.io'

export const loader = async ({ params }) => {
  try {
    const language = getLanguage(params)
    const data = await fetchDataFromSanity({ language })
    const allItems = [
      ...data.pages,
      ...data.posts,
      ...data.services,
      ...data.useCases,
    ]
    const sitemapXml = createSitemapXml({ allItems, language })

    return new Response(sitemapXml, {
      headers: { 'Content-Type': 'application/xml' },
    })
  } catch (error) {
    console.error(error)
    return new Response('An error occurred while processing your request.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

async function fetchDataFromSanity({ language }) {
  const query = `
  {
    "pages": *[
      _type == "page" && 
      defined(slug.current) && 
      !(_id in path('drafts.**')) && 
      publishStatus == "public" && 
      _createdAt < now() &&
     language == $language
    ] | order(publishedAt desc) {
      "slug": slug.current,
      _updatedAt,
      ${translations}
    },
    "posts": *[
      _type == "post" && 
      defined(slug.current) && 
      !(_id in path('drafts.**')) && 
      publishStatus == "public" && 
      _createdAt < now() &&
     language == $language
    ] | order(publishedAt desc) {
      "slug": "blog/" + slug.current,
      _updatedAt,
      ${translations}
    },
    "services": *[
      _type == "service" && 
      defined(slug.current) && 
      !(_id in path('drafts.**')) && 
      publishStatus == "public" && 
      _createdAt < now() &&
     language == $language
    ] | order(publishedAt desc) {
      "slug": "services/" + slug.current,
      _updatedAt,
      ${translations}
    },
    "useCases": *[
      _type == "useCase" && 
      defined(slug.current) && 
      !(_id in path('drafts.**')) && 
      publishStatus == "public" && 
      _createdAt < now() &&
     language == $language
    ] | order(publishedAt desc) {
      "slug": "realisation/" + slug.current,
      _updatedAt,
      ${translations}
    }
  }
  `

  const options = {} // Ajoutez les options nécessaires si besoin
  const result = await loadQuery(query, { language }, options)
  return result.data
}

const createSitemapXml = ({ allItems, language }) => {
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html">
`

  const languagePrefix = language === 'fr' ? '' : `/${language}`

  for (const sanityDocument of allItems) {
    const isHome = sanityDocument.slug === '/'

    const slug = isHome ? '' : `/${sanityDocument.slug}`
    const pageUrl = `${baseUrl}${languagePrefix}${slug}`

    const otherTranslations = sanityDocument.translations
    // .filter(
    //   (t) => t.language !== language
    // )

    sitemapXml += `
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${sanityDocument._updatedAt}</lastmod>
    <priority>${isHome ? '1.00' : '0.80'}</priority>
    ${otherTranslations
        .map((t) => {
          const alternatePrefix = t.language === 'fr' ? '' : `/${t.language}`

          const alternatePath = slug.replace(slug?.split('/')?.slice(-1), t.slug)

          const alternateUrl = `${baseUrl}${alternatePrefix}${alternatePath}`

          return `<xhtml:link rel="alternate" hreflang="${t.language}" href="${alternateUrl}" />`
        })
        .join('\n    ')}
  </url> `
  }

  sitemapXml += `</urlset>`
  return sitemapXml
}
