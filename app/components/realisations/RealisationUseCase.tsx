import { PortableText } from '@portabletext/react'

import Container from '../Container'
import Image from '../Image'

export const UseCaseIntro = ({ title, description, image, summary }) => {
  return (
    <Container>
      <div className='flex w-full flex-col items-center gap-4 sm:my-16 sm:flex-row sm:gap-16'>
        <h2 className='font-bai text-2xl sm:w-3/5 sm:leading-[67px] lg:text-[56px]'>
          {title}
        </h2>
        <div className='sm:w-2/5'>
          <PortableText value={description}></PortableText>
        </div>
      </div>
      <div className='my-16 grid gap-16 sm:grid-cols-2'>
        <Image
          image={image}
          className='aspect-square size-full rounded-3xl border border-black bg-gray-50 object-cover'
        />
        <div className='my-auto flex flex-col gap-8'>
          {summary.map((item) => (
            <div key={item.title} className='flex items-start gap-4'>
              <img
                src='/img/rocket-green.svg'
                width='auto'
                height={32}
                className='h-[22px] sm:h-[32px]'
                alt=''
              />
              <div className='flex flex-col gap-2'>
                <h3 className='text-lg leading-none sm:text-2xl'>
                  {item.title}
                </h3>
                <p className='text-sm sm:text-md'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
