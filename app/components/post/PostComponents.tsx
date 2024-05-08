import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import queryString from 'query-string'

import { updateQuery } from '~/utils/location'

import Button from '../layout/Button'

export const Tags = ({ tags, className = '' }) => {
  const location = useLocation()
  return (
    <div className={clsx('flex cursor-pointer gap-x-4', className)}>
      {tags.map((tag, i) => (
        <Link
          key={tag.slug}
          to={
            location.pathname === '/blog' &&
            queryString.parse(location.search).tag === tag.title
              ? '/blog'
              : `/blog?${queryString.stringify({ tag: tag.title })}`
          }
        >
          <Button
            key={tag.slug}
            className={clsx('font-work text-xs', tag.active && 'bg-rGreen')}
          >
            <span>{tag.title}</span>
          </Button>
        </Link>
      ))}
    </div>
  )
}

export const PreHeader = ({ tags, estimatedReadingTime }) => {
  return (
    <div className='flex items-center space-x-4'>
      <Tags tags={tags}></Tags>
      <p className='text-xs font-bold'>{estimatedReadingTime} min read</p>
    </div>
  )
}

export const Share = ({ url }) => {
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

export const Breadcrumbs = () => {
  return (
    <div className='flex flex-col py-8'>
      <Link className='flex gap-x-4' to='/blog'>
        <span>{'<'}</span>
        <span>All Posts</span>
      </Link>
    </div>
  )
}
