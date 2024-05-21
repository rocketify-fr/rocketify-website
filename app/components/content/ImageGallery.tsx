import { PortableText } from '@portabletext/react'
import clsx from 'clsx'

import Container from '../Container'

const ImageGallery = ({ gallery }) => {
  return (
    <Container>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {gallery.map((image, index, col) => {
          const fullWidth = index % 3 === 0 && col.length !== 2
          return (
            <div
              key={index}
              className={clsx(
                'overflow-hidden rounded-3xl border border-black',
                fullWidth ? 'sm:col-span-2' : 'sm:col-span-1'
              )}
            >
              <img
                src={image.url}
                alt={image.alt}
                className={clsx(
                  'w-full object-cover',
                  fullWidth
                    ? 'aspect-[4/3] sm:aspect-video'
                    : 'aspect-[4/3] sm:aspect-square'
                )}
              />
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default ImageGallery
