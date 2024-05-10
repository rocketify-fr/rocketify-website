import { PortableText } from '@portabletext/react'
import clsx from 'clsx'

import Container from '../Container'

const ImageGallery = ({ gallery }) => {
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

export default ImageGallery
