import { PortableText } from '@portabletext/react'
import { Link } from '@remix-run/react'
import queryString from 'query-string'

import Container from './Container'

const Tags = ({ tags }) => {
  return (
    <div className='flex gap-x-4'>
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          to={`/blog?${queryString.stringify({ tag: tag.slug })}`}
          className='flex items-center justify-center rounded-3xl border border-black px-4 py-2'
        >
          <span>{tag.title}</span>
        </Link>
      ))}
    </div>
  )
}
const Share = ({ url }) => {
  return (
    <div className='flex gap-x-2'>
      {['link', 'linkedin', 'x', 'facebook'].map((name) => (
        <div className='flex size-[64px] items-center justify-center rounded-full bg-gray-100 font-bai text-3xl font-bold'>
          {name[0]}
        </div>
      ))}
    </div>
  )
}
const Breadcrumbs = () => {
  return (
    <div className='flex flex-col py-8'>
      <Link className='flex gap-x-4' to='/blog'>
        <span>{'<'}</span>
        <span>All Posts</span>
      </Link>
    </div>
  )
}

export function Post ({ post: postData, encodeDataAttribute }) {
  const {
    title,
    tags,
    estimatedReadingTime,
    image,
    _createdAt,
    slug,
    content,
    relatedPosts,
    ...post
  } = postData
  return (
    <>
      <Container className='flex flex-col'>
        <Breadcrumbs></Breadcrumbs>
        <div className='flex items-center space-x-4'>
          <Tags tags={tags}></Tags>
          <p className='text-xs font-bold'>{estimatedReadingTime} min read</p>
        </div>
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
        <div className='grid grid-cols-3 gap-x-4 pt-16'>
          {relatedPosts.map((related) => (
            <div className='flex flex-col overflow-hidden rounded-3xl border border-black'>
              <img
                src={related.image.url}
                alt={related.image.alt}
                className='aspect-video w-full border-b border-black object-cover'
              />
              <div className='flex flex-col gap-y-4 p-4'>
                <div className='flex items-center space-x-4'>
                  <Tags tags={related.tags}></Tags>
                  <p className='text-xs'>
                    {related.estimatedReadingTime} min read
                  </p>
                </div>
                <h3 className='font-bai text-[26px]'>{related.title}</h3>
                <p className='text-sm'>{related.description}</p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-x-4'>
                    <img
                      width={40}
                      height={40}
                      src={related.author.image.url}
                      alt={related.author.image.alt}
                      className='size-[40px] rounded-full'
                    />
                    <p>{related.author.name}</p>
                  </div>
                  <div>{new Date(related._createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
