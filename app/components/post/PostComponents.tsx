import { Link } from '@remix-run/react'
import queryString from 'query-string'

export const Tags = ({ tags }) => {
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
