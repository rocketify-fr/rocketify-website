import { PortableText } from '@portabletext/react'

import Container from '../Container'
import Button from '../layout/Button'
import { Link } from '../Link'

const HeroSection = ({ title, description, image, cta }) => {
  return (
    <Container className='flex gap-16'>
      <div className='my-auto flex w-3/5 flex-col items-start'>
        <h2 className='pb-8 font-bai text-[56px] leading-[65px]'>{title}</h2>
        <div className='pb-12 text-paragraph'>
          <PortableText value={description}></PortableText>
        </div>
        <Button className='bg-rGreen'>
          <Link link={cta.link}>Prendre rendez-vous</Link>
        </Button>
      </div>
      <img src={image.url} alt={image.alt} className='w-2/5 rounded-3xl' />
    </Container>
  )
}

export default HeroSection
