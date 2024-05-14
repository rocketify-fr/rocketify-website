import { Link } from '@remix-run/react'

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
