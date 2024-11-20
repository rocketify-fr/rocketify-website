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
    <RemixLink className={clsx(className)} to={path}>
      {children || label}
    </RemixLink>
  )
}
export function Link({ children, className = null, link: _link }) {
  const { linkType, label, ...linkData } = _link
  const link = linkData[linkType]

  if (!link) {
    console.log({ _link })
    return label
  }

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

  let prefix = ''

  if (type === 'post') {
    prefix += 'blog/'
  }
  if (type === 'service') {
    prefix += 'services/'
  }

  const path = getLocalizedPath(language, `${prefix}${link.slug || ''}`)

  return (
    <RemixLink className={clsx(className)} to={path}>
      {children || label}
    </RemixLink>
  )
}
