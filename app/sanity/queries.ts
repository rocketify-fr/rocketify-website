import groq from 'groq'

const logo = '"logo": logo{"url": asset->url, alt}'

const image = '"image": image{"url": asset->url, "_id": asset->_id, alt}'

const localized = `[_key == $language][0].value`

// const getImage = (name) => `"${name}": ${name}{"url": asset->url, alt}`

const link = `
  "external": {
    blank,
    href,
    "title": title${localized}
  },
  "internal": internalLink-> {
    "title": title${localized},
    "slug": slug.current,
    "type": _type
  },
  "label": label${localized},
  linkType
`

const seo = `
seo {
  title,
  description
}
`
const testimonial = `
  testimonial[]->{
    _id,
    _type,
    name,
    description,
    job,
    ${logo},
    avatar{
      alt,
      "url": asset->url, alt
    }
  }
`
const ctaButton = `
  cta {
    _type,
    colorName,
    link {
      ${link}
    }
  }
`

const ctaButtonMenu = `
    _type,
    colorName,
    ...link {${link}}
`
const heroSection = `
heroSection[]->{
    _id,
    _type,
    title,
    description,
    ${image},
    ${ctaButton}
  }
`

const serviceHighlights = `
  title,
  description,
  services[] {
    _type,
    title,
    description,
    colorName,
    link {${link}}
  }
`

const methodology = `
  title,
  description,
  ${image},
  summary[] {
    title,
    description
  }
`

const projectShowcase = `
  title,
  description,
  projects[]-> {
    _id,
    _type,
    title,
    description,
    _updatedAt,
    _createdAt,
    "slug": slug.current,
    ${image},
    tags[]{
      title,
      "slug": slug.current,
      _type
    }
  }
`
const painPoints = `
  title,
  colorName,
  painPoints[]
`
const headingTagline = `
  title,
  description
`

const textAndImage = `
  title,
  description,
  ${image}
`

const faq = `
  title,
  description,
  faqItems[]{
    title,
    description
  }
`

const hero = `
  _type,
  title,
  description[],
  ${image},
  ${ctaButton}
`

const headbang = `
  title,
  ...${ctaButton} { link, colorName }
`

const pageAndServiceContent = `
  _type,
  _type == "reference" => {
    ...@-> {
      _id,
      _type,
      _type == "headband" => {${headbang}},
      _type == "heroSection" => {${hero}},
    }
  },
  _type == "serviceHighlights" => {${serviceHighlights}},
  _type == "methodology" => {${methodology}},
  _type == "projectShowcase" => {${projectShowcase}},
  _type == "painPoints" => {${painPoints}},
  _type == "headingTagline" => {${headingTagline}},
  _type == "textAndImage" => {${textAndImage}},
  _type == "faq" => {${faq}},
  _type == "rawContent" => {...},
`
const menu = `
  menu[] {
    _type,
    _type == "customLink" => {${link}},
    _type == "ctaButton" => {${ctaButtonMenu}},
    _type == "reference" => {
      ...@-> {
        _id,
        _type,
        _type == "nav" => {
          "title": title${localized},
          menu[] {
            _type == "customLink" => {${link}},
            _type == "ctaButton" => {${ctaButtonMenu}},
          }
        }
    }}
  }
`
// Rocketify Queries \\
export const HEADER_QUERY = `*[_type == "header" ]{
  ...menuHeader-> {
    ${menu}
  },
  ${logo},
}[0]`

export const FOOTER_QUERY = `*[_type == "footer" ]{
  ${logo},
  "description": description${localized},
  "menuTitle": menuTitle${localized},
  ...menu-> {${menu}},
  "certificationsTitle": certificationsTitle${localized},
  certifications[]{
    title, 
    description, 
    ${logo}, 
    issueDate
  },
  contactTitle,
  contactMenu[]{
    ...
  },
  menuSubFooter-> {${menu}},
}[0]`

export const LAYOUT_QUERY = groq`{
  "header": ${HEADER_QUERY},
  "footer": ${FOOTER_QUERY},
}`

export const HOMEPAGE_QUERY = groq`
*[_type == "page" && title == 'Accueil'][0] {
...,
  _id,
  _type,
  title,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  },
  publishStatus,
  _createdAt,
  _updatedAt,
  "slug": slug.current,
  seo {
    title,
    description
  },
  content[]{
    ${pageAndServiceContent}
  }
}
`

export const POST_TAGS_QUERY = groq`
*[_type == "postTag"]{
 title,
 "slug": slug.current
}
`

export const SERVICE_NAMES_QUERY = groq`*[_type == "service"] {
  title,
  description,
}`

export const SERVICE_QUERY = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  },
  publishStatus,
  description,
  ${image},
  ${seo},
  content[]{
    ${pageAndServiceContent}
  }
}`

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  },
  publishStatus,
  "slug": slug.current,
  ${seo},
  content[]{
    ${pageAndServiceContent}
  }
}`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug && language == $lang][0]{
  _id,
  _type,
  title,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  },
  publishStatus,
  _createdAt,
  _updatedAt,
  content,
  "slug": slug.current,
  "author": author->name,
  "authorImage": author->image,
  "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  ${image},
  tags[]{
    title,
    "slug": slug.current,
  },
  relatedPosts[]->{
    _id,
    _type,
    title,
    description,
    _updatedAt,
    _createdAt,
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
    "slug": slug.current,
    author-> {
      name,
      ${image}
    },
    ${image},
    tags[]{
      title,
      "slug": slug.current,
      _type
    }
  },
  seo {
    title,
    description
  },
}`

export const POST_CARD = `
{
  _id,
  _type,
  title,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  },
  description,
  _updatedAt,
  _createdAt,
  "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  "slug": slug.current,
  author-> {
    name,
    ${image}
  },
  ${image},
  tags[]{
    title,
    "slug": slug.current,
    _type
  }
}
`
export const POSTS_QUERY_TAG = groq`*
  [_type == "post"]
  [$tag in tags[].slug.current]
  ${POST_CARD}
  | order($order) [$from...$to] 
`
export const POSTS_QUERY = groq`*
  [_type == "post" && language == $lang]
  ${POST_CARD}
  | order($order) [$from...$to] 
`

export const USE_CASE_QUERY = groq`*[_type == "useCase" && slug.current == $slug][0]{
...,
  _id,
  _type,
  title,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  },
  publishStatus,
  url,
  description,
  _createdAt,
  _updatedAt,
  content[] {
    _type,
    ${image},
    description,
    gallery[] {
      "url": asset-> url,
      alt
    },
  },
  "slug": slug.current,
  ${image},
  intro {
    _type,
    summary,
    ${image},
    description,
    title
  },
  tags[]{
    title,
    "slug": slug.current,
  },
  ${testimonial},
  moreDetailsPosts[]->{
    _id,
    _type,
    title,
    description,
    _updatedAt,
    _createdAt,
    "slug": slug.current,
    ${image},
    tags[]{
      title,
      "slug": slug.current,
      _type
    }
  },
  similarProjectPosts[]->{
    _id,
    _type,
    title,
    description,
    _updatedAt,
    _createdAt,
    "slug": slug.current,
    ${image},
    tags[]{
      title,
      "slug": slug.current,
      _type
    }
  },
  ${heroSection},
  seo {
    title,
    description
  },
}`

export const USE_CASES_QUERY = groq`*[_type == "useCase"][0...12]|order(title asc){
  _id,
  _type,
  title,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  },
  description,
  _updatedAt,
  _createdAt,
  "slug": slug.current,
  ${image},
  tags[]{
    title,
    "slug": slug.current,
  },
  seo {
    title,
    description
  }
} | order(_updatedAt desc)`
