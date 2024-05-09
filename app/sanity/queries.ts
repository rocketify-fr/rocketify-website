import groq from 'groq'

export const RECORDS_QUERY = groq`*[_type == "record"][0...12]|order(title asc){
    _id,
    _type,
    title,
    releaseDate,
    "slug": slug.current,
    "artist": artist->name,
    image
  } | order(releaseDate desc)`

export const RECORD_QUERY = groq`*[_type == "record" && slug.current == $slug][0]{
  ...,
  _id,
  title,
  releaseDate,
  // GROQ can re-shape data in the request!
  "slug": slug.current,
  "artist": artist->name,
  // coalesce() returns the first value that is not null
  // so we can ensure we have at least a zero
  "likes": coalesce(likes, 0),
  "dislikes": coalesce(dislikes, 0),
  // for simplicity in this demo these are typed as "any"
  // we can make them type-safe with a little more work
  // https://www.simeongriggs.dev/type-safe-groq-queries-for-sanity-data-with-zod
  image,
  content,
  // this is how we extract values from arrays
  tracks[]{
    _key,
    title,
    duration
  }
}`

const logo = '"logo": logo{"url": asset->url, alt}'

const image = '"image": image{"url": asset->url, alt}'

const getImage = (name) => `"${name}": ${name}{"url": asset->url, alt}`

const link = `
  "external": {
    blank,
    href,
    title
  },
  "internal": internalLink-> {
    title,
    "slug": slug.current,
    "type": _type
  },
  linkType
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
    ${link}
  }
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
    title,
    description,
    "icon": ${getImage('icon')}
    "link": ${link}
  }
`

const methodology = `
  title,
  description,
  image {
    "imageUrl": asset->url,
    alt
  },
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

const hero = `
  title,
  description[],
  ${image},
  ${ctaButton}
`

const headbang = `
  title,
  ${ctaButton}
`
// Rocketify Queries \\
export const HEADER_QUERY = `*[_type == "header" ]{
  ${logo},
  menu[]{
    ${link}
  }
}[0]`

export const FOOTER_QUERY = `*[_type == "footer" ]{
  ${logo},
  description,
  menuTitle,
  menu[]{
    ${link}
  },
  certificationsTitle,
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
  menuSubFooter[]{
    ${link}
  }
}[0]`

export const HOME_QUERY = groq`{
  "header": ${HEADER_QUERY},
  "footer": ${FOOTER_QUERY},
}`

export const HOMEPAGE_QUERY = groq`
*[_type == "page" && title == 'Accueil'] {
  _id,
  _type,
  title,
  _createdAt,
  _updatedAt,
  "slug": slug.current,
  seo {
    title,
    description
  },
  content[]{
    _type == "reference" => {
      "_refDetails": @-> {
        _id,
        _type,
        _type == "headband" => {${headbang}},
        _type == "heroSection" => {${hero}},
      }
    },
    _type == "serviceHighlights" => {${serviceHighlights}},
    _type == "methodology" => {${methodology}},
    _type == "projectShowcase" => {${projectShowcase}},
  }
}
`

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  _type,
  title,
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

export const POSTS_QUERY = groq`*[_type == "post"][0...12]|order(title asc){
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
} | order(_updatedAt desc)`

export const USE_CASE_QUERY = groq`*[_type == "useCase" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  _createdAt,
  _updatedAt,
  content,
  "slug": slug.current,
  ${image},
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
  description,
  _updatedAt,
  _createdAt,
  "slug": slug.current,
  ${image},
  tags[]{
    title,
    "slug": slug.current,
  }
} | order(_updatedAt desc)`
