import { PortableText } from '@portabletext/react'

import Container from '../Container'

const Methodology = ({ title, description, image, summary }) => {
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
          {summary.map((item, i) => (
            <div className='flex py-2 lg:gap-8' key={i}>
              <div className='hidden w-16  flex-col items-center gap-4 lg:flex'>
                <p className='flex size-[48px] min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-black bg-rGreen text-[24px]'>
                  {i + 1}
                </p>
                {i + 1 < summary.length && (
                  <span className='-mb-8 h-full w-px border border-r-black'></span>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='pt-2 text-2xl leading-none'>{item.title}</h3>
                <p className='text-md'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Methodology
