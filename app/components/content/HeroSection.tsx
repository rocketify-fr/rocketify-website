import { PortableText } from '@portabletext/react'
import urlBuilder from '@sanity/image-url'

import { dataset, projectId } from '~/sanity/projectDetails'

import Container from '../Container'
import Button from '../layout/Button'
import { Link } from '../Link'

const builder = urlBuilder({ projectId, dataset })

export function urlFor(source) {
  return builder.image(source)
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
          <Link link={cta.link}>{cta.label}</Link>
        </Button>
      </div>
      <img
        className="aspect-[4/3] rounded-3xl sm:aspect-[21/9] lg:aspect-[4/3] lg:w-2/5"
        alt={image?.alt ?? ``}
        fetchpriority="high"
        src={urlFor(image._id)
          .width(576)
          .height(432)
          .fit('max')
          .quality(90)
          .auto('format')
          .url()}
        // srcSet avec les 3 tailles
        srcSet={`
          ${urlFor(image._id)
            .width(608)
            .height(456)
            .fit('max')
            .quality(90)
            .auto('format')
            .url()} 608w,
          ${urlFor(image._id)
            .width(736)
            .height(552)
            .fit('max')
            .quality(90)
            .auto('format')
            .url()} 736w,
          ${urlFor(image._id)
            .width(576)
            .height(432)
            .fit('max')
            .quality(90)
            .auto('format')
            .url()} 576w
        `}
        sizes="
          (max-width: 639px) 608px,
          (max-width: 1023px) 736px,
          (min-width: 1024px) 576px
        "
      />

    </Container>
  )
}

export default HeroSection
