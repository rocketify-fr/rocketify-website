import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import queryString from 'query-string'

import Button from '../layout/Button'
// preventScrollReset
// to={
//   location.pathname === '/blog' &&
//   queryString.parse(location.search).tag === tag.title
//     ? '/blog'
//     : `/blog?${queryString.stringify({ tag: tag.title })}`
// }

export const Tags = ({ tags, className = '' }) => {
  const location = useLocation()
  return (
    <div className={clsx('flex gap-x-4', className)}>
      {tags.map((tag, i) => (
        <span key={tag.slug}>
          <Button
            className={clsx(
              'pointer-events-none font-work text-xs',
              tag.active && 'bg-rGreen'
            )}
          >
            <span>{tag.title}</span>
          </Button>
        </span>
      ))}
    </div>
  )
}
