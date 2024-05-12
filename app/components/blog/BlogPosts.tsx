import { useLoaderData } from '@remix-run/react'

import { PostContent } from '../content/PostContent'

export default function BlogPosts() {
  const { pageData } = useLoaderData()

  return (
    <>
      <PostContent content={pageData.content}></PostContent>
    </>
  )
}
