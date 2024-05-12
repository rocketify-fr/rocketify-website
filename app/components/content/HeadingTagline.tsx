import Container from '~/components/Container'

const HeadingTagline = ({ title, description }) => {
  return (
    <Container className='flex flex-col items-center justify-between gap-16 lg:flex-row'>
      <h2 className='w-1/2 text-[56px]'>{title}</h2>
      <p className='w-1/2'> {description}</p>
    </Container>
  )
}

export default HeadingTagline
