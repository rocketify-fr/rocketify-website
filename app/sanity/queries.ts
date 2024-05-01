import groq from 'groq'

export const HOME_QUERY = groq`*[_id == "home"][0]{ title, siteTitle }`

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

// Rocketify Queries \\

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]]{
    _id,
  _type,
  title,
  _updatedAt,
  content,
  "slug": slug.current,
  "author": author->name,
  "authorImage": author->image,
  image,
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
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
    "slug": slug.current,
    "author": author->name,
    "authorImage": author->image,
    image,
    tags[]{
      title,
      "slug": slug.current,
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
  "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  "slug": slug.current,
  "author": author->name,
  "authorImage": author->image,
  image,
  tags[]{
    title,
    "slug": slug.current,
  }
} | order(_updatedAt desc)`
