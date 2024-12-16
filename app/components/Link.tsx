import { Link as RemixLink, useRouteLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { getLocalizedPath } from '~/utils/language'

export function SimpleLink({
  className = null,
  label = null,
  to,
  children = null,
}) {
  const { language } = useRouteLoaderData('root')

  const path = getLocalizedPath(language, to)

  return (
    <RemixLink prefetch='intent' className={clsx(className)} to={path}>
      {children || label}
    </RemixLink>
  )
}
export function Link({ children, className = null, link: _link }) {
  const { linkType, label, ...linkData } = _link
  const link = linkData[linkType]

  const { language } = useRouteLoaderData('root')

  if (!link) {
    console.log({ _link })
    return label
  }

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

  let prefix = ''

  if (type === 'post') {
    prefix += 'blog/'
  } else if (type === 'app') {
    prefix += 'apps/'
  } else if (type === 'service') {
    prefix += 'services/'
  } else if (type !== 'page') {
    console.log({ type })
  }

  const path = getLocalizedPath(language, `${prefix}${link.slug || ''}`)

  return (
    <RemixLink prefetch='intent' className={clsx(className)} to={path}>
      {children || label}
    </RemixLink>
  )
}
