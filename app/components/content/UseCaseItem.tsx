import { PortableText } from '@portabletext/react'
import clsx from 'clsx'

import Container from '../Container'
import Image from '../Image'
import Separator from '../Separator'

const UseCaseItem = ({ description, image, reverse, separator }) => {
  return (
    <Container>
      <div
        className={clsx(
          'flex flex-col sm:flex-row',
          reverse && 'sm:flex-row-reverse'
        )}
      >
        <div
          className={clsx(
            'use-item-content my-auto flex flex-col sm:w-1/2',
            reverse ? 'sm:pl-8' : 'sm:pr-8'
          )}
        >
          <PortableText value={description}></PortableText>
        </div>

        <div className='pt-8 sm:w-1/2 sm:pt-0'>
          <Image
            width={725}
            height={485}
            image={image}
            className='aspect-[4/3] rounded-3xl border border-black bg-gray-50 object-cover'
          />
        </div>
      </div>
      {separator && <Separator />}
    </Container>
  )
}

export default UseCaseItem
