import { Link } from '@remix-run/react'
import clsx from 'clsx'

import { PreHeader } from './PostComponents'

export default function PostCard({
  post,
  horizontal = false,
  className = null,
}) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={clsx(
        'flex overflow-hidden rounded-3xl border border-black',
        !horizontal && 'flex-col',
        className
      )}
    >
      <img
        src={post.image.url}
        alt={post.image.alt}
        className={clsx(
          'w-full border-b border-black object-cover',
          horizontal ? 'lg:aspect-[11/10] lg:flex-[2]' : 'aspec-video'
        )}
      />
      <div
        className={clsx(
          'flex flex-col p-4',
          horizontal && 'lg:my-auto lg:flex-[1] lg:px-6'
        )}
      >
        <PreHeader
          tags={post.tags}
          estimatedReadingTime={post.estimatedReadingTime}
        ></PreHeader>
        <h3 className='font-bai text-[26px] leading-[100%]'>{post.title}</h3>
        <p className='text-sm'>{post.description}</p>
        <div className='flex items-center justify-between pt-4'>
          <div className='flex items-center gap-x-4'>
            <img
              width={40}
              height={40}
              src={post.author.image.url}
              alt={post.author.image.alt}
              className='size-[40px] rounded-full'
            />
            <p>{post.author.name}</p>
          </div>
          <div>{new Date(post._createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </Link>
  )
}
