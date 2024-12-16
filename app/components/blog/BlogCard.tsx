import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'

import { getRandomColor } from '~/utils/colors'
import { getLocalizedPath } from '~/utils/language'

import { PreHeader } from '../post/BlogHeader'

export default function PostCard({
  post,
  horizontal = false,
  className = null,
}) {
  return (
    <div className='relative'>
      <Link
        to={`${getLocalizedPath(post.language, `/blog/${post.slug}`)}`}
        className={clsx(
          'z-10 flex flex-col overflow-hidden rounded-3xl border border-black bg-white transition-transform duration-500 hover:-translate-y-2 hover:translate-x-2',
          horizontal && 'lg:flex-row',
          className
        )}
      >
        <img
          src={post.image.url}
          alt={post.image.alt}
          className={clsx(
            'aspect-video object-cover',
            horizontal && 'flex-[2] lg:max-w-[66%]'
          )}
        />
        <div
          className={clsx(
            'flex flex-col gap-4 p-4',
            horizontal && 'flex-[1] lg:my-auto'
          )}
        >
          <PreHeader
            tags={post.tags}
            estimatedReadingTime={post.estimatedReadingTime}
          ></PreHeader>
          <h3 className='font-bai text-[26px] leading-[100%]'>{post.title}</h3>
          <p className='line-clamp-3 text-sm'>{post.description}</p>
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
      <div
        className={clsx(
          'absolute left-0 top-0 -z-10 size-full rounded-3xl',
          `bg-${getRandomColor()}`
        )}
      ></div>
    </div>
  )
}
