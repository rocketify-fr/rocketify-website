import { PortableText } from '@portabletext/react'

import Container from '../Container'
import Button from '../layout/Button'
import { Link } from '../Link'

const HeroSection = ({ title, description, image, cta }) => {
  return (
    <Container className='flex flex-col lg:flex-row gap-16'>
      <div className='my-auto flex lg:w-3/5 flex-col items-start'>
        <h2 className='pb-8 font-bai text-[56px] leading-[65px]'>{title}</h2>
        <div className='pb-12 text-paragraph'>
          <PortableText value={description}></PortableText>
        </div>
        <Button className='bg-rGreen'>
          <Link link={cta.link}>Prendre rendez-vous</Link>
        </Button>
      </div>
      <img src={image.url} alt={image.alt} className='lg:w-2/5 rounded-3xl aspect-[4/3] sm:aspect-[21/9] lg:aspect-[4/3]' />
    </Container>
  )
}

export default HeroSection
