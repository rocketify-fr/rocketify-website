import clsx from 'clsx'

import Container from '../Container'

const Testimonials = ({ testimonials, title, subTitle }) => {
  return (
    <Container>
      <h2 className='font-bai text-2xl sm:text-[56px]'>{title}</h2>
      <p className='pb-12 text-sm sm:text-paragraph'>{subTitle}</p>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {testimonials.map((testimonial, index, col) => (
          <div
            key={index}
            className={clsx(
              col.length === 1 && 'sm:col-span-2 xl:col-span-3',
              'flex flex-col gap-4 rounded-3xl border border-black p-6'
            )}
          >
            <img
              src={testimonial.logo.url}
              alt={testimonial.logo.alt}
              width={105}
            />
            <p>{testimonial.description}</p>
            <div className='flex gap-4'>
              <img
                src={testimonial.avatar.url}
                alt={testimonial.avatar.alt}
                className='size-[56px] rounded-full'
              />
              <div className='flex flex-col justify-center'>
                <h5 className='font-bold'>{testimonial.name}</h5>
                <p>{testimonial.job}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Testimonials
