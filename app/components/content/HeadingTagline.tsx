import Container from '~/components/Container'

const HeadingTagline = ({ title, description }) => {
  return (
    <Container className='flex flex-col justify-between gap-16 pb-8 sm:items-start lg:flex-row'>
      <h2 className='text-2xl sm:w-1/2 sm:text-[56px]'>{title}</h2>
      <p className='sm:w-1/2'> {description}</p>
    </Container>
  )
}

export default HeadingTagline
