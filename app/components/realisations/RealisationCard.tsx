import { Link } from '@remix-run/react'
import clsx from 'clsx'

import { SimpleLink } from '../Link'

export default function RealisationCard({
  realisation,
  horizontal = false,
  className = null,
}) {
  const [bigTitle, subTitle] = realisation.title.split(' | ')
  return (
    <SimpleLink
      to={`/realisations/${realisation.slug}`}
      className={clsx(
        'flex overflow-hidden rounded-3xl border border-black',
        !horizontal && 'flex-col',
        className
      )}
    >
      <img
        src={realisation.image.url}
        alt={realisation.image.alt}
        className={clsx(
          'w-full border-b border-black object-cover lg:max-h-[25vw]',
          horizontal ? 'lg:aspect-[11/10] lg:flex-[2]' : 'aspect-[16/9]'
        )}
      />
      <div
        className={clsx(
          'flex flex-col gap-2 p-6',
          horizontal && 'lg:my-auto lg:flex-[1] lg:px-6'
        )}
      >
        <h3 className='font-bai text-[26px] leading-[100%]'>{bigTitle}</h3>
        <h2 className='text-lg'>{subTitle}</h2>
        <p className='text-sm'>{realisation.description}</p>
      </div>
    </SimpleLink>
  )
}
