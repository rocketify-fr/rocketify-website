import { PortableText } from '@portabletext/react'
import { Link } from '@remix-run/react'

import Container, { Page } from './Container'
import PostCard from './post/PostCard'
import { Breadcrumbs, PreHeader, Share } from './post/PostComponents'

export function Post ({ post: postData }) {
  const {
    title,
    tags,
    estimatedReadingTime,
    image,
    _createdAt,
    slug,
    content,
    relatedPosts,
  } = postData
  return (
    <>
      <Container className='flex flex-col'>
        <Breadcrumbs></Breadcrumbs>
        <PreHeader
          tags={tags}
          estimatedReadingTime={estimatedReadingTime}
        ></PreHeader>
        <h1 className='py-2 font-bai text-6xl'>{title}</h1>
        <div className='flex w-full flex-col py-4'>
          <img
            src={image.url}
            alt={image.alt}
            className='my-4 aspect-video rounded-3xl border border-black object-cover'
          />
          <div className='flex justify-between py-4'>
            <div className='flex flex-col'>
              <span className='text-sm'>Published on</span>
              <span className='text-sm font-[500]'>
                {new Date(_createdAt).toLocaleDateString()}
              </span>
            </div>
            <Share url={`/blog/${slug}`}></Share>
          </div>
        </div>
        <div className='post-content mx-auto max-w-[870px] py-8'>
          <PortableText value={content}></PortableText>
        </div>
      </Container>
      {relatedPosts?.length > 0 && (
        <>
          <div className='my-16 h-px w-full bg-black'></div>
          <Container className='flex flex-col'>
            <h2 className='font-bai text-5xl'>Related posts</h2>
            <div className='flex items-end justify-between'>
              <div>hardcoded lorem ipsum lol</div>
              <Link
                to='/blog'
                className='rounded-3xl border border-black bg-rGreen px-4 py-2'
              >
                Voir tous les articles
              </Link>
            </div>
            <div className='grid grid-cols-3 gap-4 pt-16'>
              {relatedPosts.map((related) => (
                <PostCard post={related}></PostCard>
              ))}
            </div>
          </Container>
        </>
      )}
    </>
  )
}
