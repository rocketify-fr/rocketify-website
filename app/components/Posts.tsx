import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import type { POSTS_QUERYResult } from '~/types/sanity.types'

import Container, { Page } from './Container'
import ResponsiveGrid from './layout/ResponsiveGrid'
import PostCard from './post/PostCard'

type PostsProps = {
  posts: POSTS_QUERYResult[]
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Posts(props: PostsProps) {
  const { posts = [] } = props

  return (
    <Page>
      <Container>
        <PostCard horizontal post={posts?.[0]}></PostCard>
        <ResponsiveGrid gapsX={4} gapsY={8} className='mt-8'>
          {new Array(9).fill(posts[1]).map((post) => (
            <PostCard post={post}></PostCard>
          ))}
        </ResponsiveGrid>
      </Container>
    </Page>
  )
}
