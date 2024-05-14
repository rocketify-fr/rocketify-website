import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import queryString from 'query-string'

import Button from '../layout/Button'

export const Tags = ({ tags, className = '' }) => {
  const location = useLocation()
  return (
    <div className={clsx('flex cursor-pointer gap-x-4', className)}>
      {tags.map((tag, i) => (
        <Link
          key={tag.slug}
          preventScrollReset
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
