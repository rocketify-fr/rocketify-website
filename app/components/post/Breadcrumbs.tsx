import { Link } from '@remix-run/react'

export const Breadcrumbs = ({ parent = {}, current = null }) => {
  return (
    <div className='flex gap-8 py-8'>
      <Link className='flex gap-x-4' to={parent.path || '/blog'}>
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
