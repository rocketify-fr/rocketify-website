import { Link } from '@remix-run/react'

import Container from '../Container'
import { Tags } from '../post/Tags'

const ProjectShowcase = ({ title, description, projects }) => {
  return (
    <Container className='py-16'>
      <h2 className='pb-2 text-[56px] leading-[68px] lg:w-1/2 lg:pr-8'>
        {title}
      </h2>
      <p className='py-4 text-paragraph'>{description}</p>
      <div className='flex gap-8'>
        {projects.map(({ slug, image, tags, title, description }, i) => (
          <Link
            key={`${slug}-${i}`}
            to={`/realisations/${slug}`}
            className='flex flex-col overflow-hidden rounded-3xl border border-black'
          >
            <img
              src={image.url}
              alt={image.alt}
              className='aspect-[21/9] w-full border-b border-black object-cover'
            />
            <div className='flex flex-col gap-4 p-6'>
              <Tags tags={tags}></Tags>
              <h3 className='text-[26px]'>{title}</h3>
              <p className='text-paragraph'>{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default ProjectShowcase
