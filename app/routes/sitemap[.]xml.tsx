// app/routes/sitemap[.]xml.js
import { json } from '@remix-run/node';
import { loadQuery } from '@sanity/react-loader'


const baseUrl = 'https://rocketify.io/';

export const loader = async () => {
  try {
    const data = await fetchDataFromSanity();
    const allItems = [
      ...data.pages,
      ...data.posts,
      ...data.services,
      ...data.useCases
    ];
    const sitemapXml = createSitemapXml(allItems);

    return new Response(sitemapXml, {
      headers: { 'Content-Type': 'application/xml' }
    });
  } catch (error) {
    console.error(error);
    return new Response('An error occurred while processing your request.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

async function fetchDataFromSanity() {
  const query = `
  {
    "pages": *[
      _type == "page" && 
      defined(slug.current) && 
      !(_id in path('drafts.**')) && 
      publishStatus == "public" && 
      _createdAt < now()
    ] | order(publishedAt desc) {
      "slug": slug.current,
    },
    "posts": *[
      _type == "post" && 
      defined(slug.current) && 
      !(_id in path('drafts.**')) && 
      publishStatus == "public" && 
      _createdAt < now()
    ] | order(publishedAt desc) {
      "slug": "blog/" + slug.current
    },
    "services": *[
      _type == "service" && 
      defined(slug.current) && 
      !(_id in path('drafts.**')) && 
      publishStatus == "public" && 
      _createdAt < now()
    ] | order(publishedAt desc) {
      "slug": "services/" + slug.current
    },
    "useCases": *[
      _type == "useCase" && 
      defined(slug.current) && 
      !(_id in path('drafts.**')) && 
      publishStatus == "public" && 
      _createdAt < now()
    ] | order(publishedAt desc) {
      "slug": "realisation/" + slug.current
    }
  }
  `;

  const options = {}; // Ajoutez les options nécessaires si besoin
  const result = await loadQuery(query, {}, options);
  return result.data;
}

const createSitemapXml = (sanity_data) => {
  let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
    'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  let parsedUrl = new Set();

  sanity_data.forEach(sanity_document => {
    sitemapXml += ` <url>\n  <loc>${baseUrl}${sanity_document.slug}</loc>\n  </url>\n`;
  });

  sitemapXml += `</urlset>`;
  return sitemapXml;
}
