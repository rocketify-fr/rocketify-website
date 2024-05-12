import Container from '../Container'
import ResponsiveGrid from '../layout/ResponsiveGrid'
import { Link } from '../Link'
import { Slider } from '../Slider'

const ServiceHighlights = ({ title, description, services }) => {
  return (
    <>
      <Container className='flex flex-col gap-4 pb-16'>
        <h2 className='text-blockHeader'>{title}</h2>
        <p className='pb-8 text-paragraph lg:w-2/3'>{description}</p>
      </Container>
      <div className='w-dvw overflow-x-hidden px-4 sm:hidden'>
        <Slider effect='cards' name='sevices'>
          {services.map(({ title, description, icon, link }, i) => {
            return (
              <Link
                link={link}
                key={i}
                className='flex max-w-[350px] flex-col gap-4 overflow-hidden rounded-3xl border border-black bg-white p-6'
              >
                <img src={icon.url} alt={icon.url} height={40} width={40} />
                <h3 className='text-[26px]'>{title}</h3>
                <p className='text-paragraph'>{description}</p>
              </Link>
            )
          })}
        </Slider>
      </div>
      <Container>
        <ResponsiveGrid className='hidden sm:grid' gaps={8}>
          {services.map(({ title, description, icon, link }, i) => {
            return (
              <Link
                link={link}
                key={i}
                className='flex flex-col gap-4 rounded-3xl border border-black p-6'
              >
                <img src={icon.url} alt={icon.url} height={40} width={40} />
                <h3 className='text-[26px]'>{title}</h3>
                <p className='text-paragraph'>{description}</p>
              </Link>
            )
          })}
        </ResponsiveGrid>
      </Container>
    </>
  )
}

export default ServiceHighlights
