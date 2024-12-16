import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'

import { getLocalizedPath } from '~/utils/language'

export default function AppCard({ app, horizontal = false, className = null }) {
  return (
    <Link
      to={`${getLocalizedPath(app.language, `/apps/${app.slug}`)}`}
      className={clsx(
        'flex overflow-hidden rounded-3xl border border-black',
        !horizontal && 'flex-col',
        className
      )}
    >
      <img
        src={app.image.url}
        alt={app.image.alt}
        className={clsx(
          'w-full border-b border-black object-contain p-4',
          horizontal ? 'lg:aspect-square lg:flex-[2]' : 'aspect-video'
        )}
      />
      <div
        className={clsx(
          'flex flex-col p-4',
          horizontal && 'lg:my-auto lg:flex-[1] lg:px-6'
        )}
      >
        <h3 className='font-bai text-[26px] leading-[100%]'>{app.title}</h3>
        <p className='text-sm'>{app.description}</p>
        <div className='flex items-center justify-between pt-4'>
          <div>{new Date(app._createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </Link>
  )
}
