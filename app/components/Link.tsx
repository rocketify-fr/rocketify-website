import { Link as RemixLink } from '@remix-run/react'
import clsx from 'clsx'

export function Link({ children, className, link: { linkType, ...linkData } }) {
  const link = linkData[linkType]

  if (linkType === 'external') {
    return (
      <a
        className={clsx(className)}
        href={link.href}
        target={link.blank ? '_blank' : ''}
        rel='noreferrer'
      >
        {link.title}
      </a>
    )
  }

  const { type } = link
  let prefix = '/'

  if (type === 'post') {
    prefix = '/blog/'
  }

  const path = `${prefix}${link.slug || ''}`

  return (
    <RemixLink className={clsx(className)} to={path}>
      {children}
    </RemixLink>
  )
}