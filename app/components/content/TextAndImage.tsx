import clsx from 'clsx'

import Container from '../Container'
import Separator from '../Separator'

const TextAndImage = ({ title, description, image, reverse, separator }) => (
  <Container>
    <div className={clsx('flex', reverse && 'flex-row-reverse')}>
      <div
        className={clsx(
          'use-item-content my-auto flex w-1/2 flex-col',
          reverse ? 'pl-8' : 'pr-8'
        )}
      >
        <h3 className='text-[48px]'>{title}</h3>
        <p className='text-paragraph' >{description}</p>
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

export default TextAndImage

