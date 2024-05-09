import { PortableText } from '@portabletext/react'

import Container from '../Container'

export const UseCaseIntro = ({ title, description, image, summary }) => {
  return (
    <Container>
      <div className='my-16 flex w-full items-center gap-16'>
        <h2 className='w-3/5 font-bai text-[56px] leading-[67px]'>{title}</h2>
        <div className='w-2/5'>
          <PortableText value={description}></PortableText>
        </div>
      </div>
      <div className='my-16 grid grid-cols-2 gap-16'>
        <img
          src={image.url}
          className='aspect-square size-full rounded-3xl border border-black bg-gray-50 object-cover'
          alt={image.alt}
        />
        <div className='my-auto flex flex-col gap-8'>
          {summary.map((item) => (
            <div className='flex items-start gap-4'>
              <img
                src='/img/rocket-green.svg'
                width='auto'
                height={32}
                alt=''
              />
              <div className='flex flex-col gap-2'>
                <h3 className='text-2xl leading-none'>{item.title}</h3>
                <p className='text-md'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
