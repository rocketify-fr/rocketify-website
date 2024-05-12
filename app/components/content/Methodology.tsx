import Container from '../Container'

const Methodology = ({ title, description, image, summary }) => {
  console.log({ description })
  return (
    <Container>
      <div className='my-16 flex w-full flex-col items-center gap-16 sm:flex-row'>
        <h2 className='font-bai text-[56px] leading-[67px] sm:w-3/5'>
          {title}
        </h2>
        <div className='sm:w-2/5'>
          <p>{description}</p>
        </div>
      </div>
      <div className='my-16 grid gap-16 sm:grid-cols-2'>
        <img
          src={image.url}
          className='aspect-square size-full rounded-3xl border border-black bg-gray-50 object-cover'
          alt={image.alt}
        />
        <div className='my-auto flex flex-col gap-8'>
          {summary.map((item, i) => (
            <div className='flex gap-6 py-2 lg:gap-8' key={i}>
              <div className='flex w-16  flex-col items-center gap-4'>
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
