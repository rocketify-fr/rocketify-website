import { Link } from '@remix-run/react'
import clsx from 'clsx'

import Container from '../Container'
import Button from '../layout/Button'
import { Tags } from '../post/Tags'
import Separator from '../Separator'

const ProjectShowcase = ({ title, description, projects }) => {
  return (
    <Container className='py-16'>
      <h2 className='pb-2 text-[38px] leading-[68px] sm:text-[56px] lg:w-1/2 lg:pr-8'>
        {title}
      </h2>
      <p className='py-4 text-paragraph'>{description}</p>
      <div className='flex flex-col gap-8'>
        {projects.map(({ slug, image, tags, title, description }, i) => (
          <>
            <div
              key={`${slug}-${i}`}
              className={clsx(
                'flex flex-col gap-6 sm:flex-row',
                i % 2 !== 0 && 'sm:flex-row-reverse'
              )}
            >
              <div className='flex flex-col items-start gap-4 sm:my-auto'>
                <h3 className='text-[26px]'>{title}</h3>
                <p className='text-paragraph'>{description}</p>
                <Tags tags={tags}></Tags>
                <Button className='bg-rPurple'>
                  <Link to={`/realisations/${slug}`}>Voir le projet</Link>
                </Button>
              </div>
              <img
                src={image.url}
                alt={image.alt}
                className='aspect-square w-full rounded-3xl border border-black object-cover'
              />
            </div>
            {i + 1 < projects.length && <Separator />}
          </>
        ))}
      </div>
    </Container>
  )
}

export default ProjectShowcase
