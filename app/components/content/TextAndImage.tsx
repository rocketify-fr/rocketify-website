import clsx from 'clsx'

import Container from '../Container'
import Separator from '../Separator'

const TextAndImage = ({ title, description, image, reverse, separator }) => (
  <Container>
    <div
      className={clsx(
        'flex flex-col sm:flex-row',
        reverse && 'gap-8 sm:flex-row-reverse'
      )}
    >
      <div
        className={clsx(
          'my-auto flex flex-col gap-8 sm:w-1/2',
          reverse ? 'sm:pl-8' : 'sm:pr-8'
        )}
      >
        <h3 className='text-xl sm:text-[48px]'>{title}</h3>
        <p className='text-paragraph'>{description}</p>
      </div>

      <div className='flex sm:w-1/2'>
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

export default TextAndImage
