import { Link, useLoaderData } from '@remix-run/react'

import { getLocalizedPath } from '~/utils/language'

export const Breadcrumbs = ({ parent = {}, current = null }) => {
  const {
    params: { lang },
  } = useLoaderData()

  return (
    <div className='flex gap-8 py-8'>
      <Link
        className='flex gap-x-4'
        to={getLocalizedPath(lang, parent.path || '/blog')}
      >
        <span>{'<'}</span>
        <span>{parent.label || 'Tous les posts'}</span>
      </Link>
      {current && (
        <span className='flex gap-x-4'>
          <span>{'<'}</span>
          <span>{current}</span>
        </span>
      )}
    </div>
  )
}
