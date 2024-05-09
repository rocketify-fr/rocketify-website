import { PortableText } from '@portabletext/react'
import clsx from 'clsx'

import Container from '../Container'

export const Separator = () => (
  <div className='my-16 h-px w-full bg-black'></div>
)

export const UseCaseItem = ({ description, image, reverse, separator }) => (
  <Container>
    <div className={clsx('flex', reverse && 'flex-row-reverse')}>
      <div
        className={clsx(
          'use-item-content my-auto flex w-1/2 flex-col',
          reverse ? 'pl-8' : 'pr-8'
        )}
      >
        <PortableText value={description}></PortableText>
      </div>

      <div className='flex w-1/2 flex-col'>
        <img
          src={image?.url}
          alt={image?.alt}
          className='aspect-[4/3] rounded-3xl border border-black bg-gray-50 object-cover'
        />
      </div>
    </div>
    {separator && <Separator />}
  </Container>
)

export const ImageGallery = ({ gallery }) => {
  return (
    <Container>
      <div className='grid gap-6 sm:grid-cols-2'>
        {gallery.map((image, index, col) => {
          const fullWidth = index % 3 === 0 && col.length !== 2
          return (
            <div
              className={clsx(
                'overflow-hidden rounded-3xl border border-black',
                fullWidth ? 'col-span-2' : 'col-span-1'
              )}
            >
              <img
                src={image.url}
                alt={image.alt}
                className={clsx(
                  'w-full object-cover',
                  fullWidth ? 'aspect-video' : 'aspect-square'
                )}
              />
            </div>
          )
        })}
      </div>
    </Container>
  )
}
