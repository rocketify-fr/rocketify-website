import { PortableText } from '@portabletext/react'
import urlBuilder from '@sanity/image-url'

import {dataset, projectId} from '~/sanity/projectDetails'

import Container from '../Container'
import Button from '../layout/Button'
import { Link } from '../Link'

const builder = urlBuilder({projectId, dataset})

export function urlFor(source) {
  return builder.image(source);
}

const HeroSection = ({ title, description, image, cta }) => {
  return (
    <Container className='flex flex-col gap-16 lg:flex-row'>
      <div className='my-auto flex flex-col items-start lg:w-3/5'>
        <h2 className='pb-8 font-bai text-2xl lg:text-[56px] lg:leading-[65px]'>
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
          className="aspect-[4/3] rounded-3xl sm:aspect-[21/9] lg:aspect-[4/3] lg:w-2/5"
          src={urlFor(image._id)
            .height(432)
            .width(576)
            .fit('max')
            .quality(100)
            .auto('format')
            .url()}
          alt={image?.alt ?? ``}
        />
    </Container>
  )
}

export default HeroSection
