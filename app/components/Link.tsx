import { Link as RemixLink, useRouteLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export function SimpleLink({
  className = null,
  label = null,
  to,
  children = null,
}) {
  const { language } = useRouteLoaderData('root')

  let prefix = ''

  if (language !== 'fr') {
    prefix += `${language}`
  }

  const path = `${prefix}${to}`

  return (
    <RemixLink className={clsx(className)} to={path}>
      {label || children}
    </RemixLink>
  )
}
export function Link({
  children,
  className = null,
  link: { linkType, label, ...linkData },
}) {
  const link = linkData[linkType]

  const { language } = useRouteLoaderData('root')

  if (linkType === 'external') {
    return (
      <a
        className={clsx(className)}
        href={link.href}
        target={link.blank ? '_blank' : ''}
        rel='noreferrer'
      >
        {link.label || link.title}
      </a>
    )
  }

  const { type } = link

  let prefix = '/'

  if (language !== 'fr') {
    prefix += `${language}/`
  }

  if (type === 'post') {
    prefix += '/blog/'
  }
  if (type === 'service') {
    prefix += '/services/'
  }

  const path = `${prefix}${link.slug || ''}`

  return (
    <RemixLink className={clsx(className)} to={path}>
      {children || label}
    </RemixLink>
  )
}
