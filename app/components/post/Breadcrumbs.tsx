import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import queryString from 'query-string'

import { updateQuery } from '~/utils/location'

import Button from '../layout/Button'

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
