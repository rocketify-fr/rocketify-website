import { PortableText } from '@portabletext/react'

import Container from '../Container'
import Button from '../layout/Button'
import { Link } from '../Link'

const HeroSection = ({ title, description, image, cta }) => {
  return (
    <Container className='flex flex-col gap-16 lg:flex-row'>
      <div className='my-auto flex flex-col items-start lg:w-3/5'>
        <h2 className='pb-8 font-bai text-2xl leading-[65px] lg:text-[56px]'>
          {title}
        </h2>
        <div className='pb-12 text-paragraph'>
          <PortableText value={description}></PortableText>
        </div>
        <Button className='bg-rGreen'>
          <Link link={cta.link}>Prendre rendez-vous</Link>
        </Button>
      </div>
      <img
        src={image.url}
        alt={image.alt}
        className='aspect-[4/3] rounded-3xl sm:aspect-[21/9] lg:aspect-[4/3] lg:w-2/5'
      />
    </Container>
  )
}

export default HeroSection
