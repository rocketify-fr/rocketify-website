import { useLoaderData } from '@remix-run/react'

import { PostContent } from '../content/PostContent'

const RealisationsPage = () => {
  const { pageData } = useLoaderData()

  return <PostContent content={pageData.content}></PostContent>
}

export default RealisationsPage
