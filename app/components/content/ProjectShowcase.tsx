import { Link } from '@remix-run/react'
import clsx from 'clsx'

import Container from '../Container'
import Button from '../layout/Button'
import { Tags } from '../post/Tags'
import Separator from '../Separator'
import { Fragment } from 'react/jsx-runtime'

const ProjectShowcase = ({ title, description, projects }) => {
  return (
    <Container className='py-16'>
      <h2 className='pb-2 text-2xl sm:text-[38px] sm:text-[56px] sm:leading-[68px] lg:w-1/2 lg:pr-8'>
        {title}
      </h2>
      <p className='py-4 text-paragraph'>{description}</p>
      <div className='flex flex-col gap-8'>
        {projects.map(({ slug, image, tags, title, description }, i) => {
          const [bigTitle, subTitle] = title.split(' | ')
          return (
            <Fragment key={`${slug}-${i}`}>
              <div
                className={clsx(
                  'flex flex-col gap-6 sm:flex-row sm:gap-12',
                  i % 2 !== 0 && 'sm:flex-row-reverse'
                )}
              >
                <div className='flex flex-col items-start gap-4 sm:my-auto sm:w-3/5'>
                  <h3 className='sm:text-[26px] sm:leading-[120%]'>
                    {bigTitle}
                  </h3>
                  <h4 className='text-lg'>{subTitle}</h4>
                  <p className='text-paragraph'>{description}</p>
                  <Tags tags={tags}></Tags>
                  <Button className='bg-rPurple'>
                    <Link to={`/realisations/${slug}`}>Voir le projet</Link>
                  </Button>
                </div>
                <img
                  src={image.url}
                  alt={image.alt}
                  className='aspect-square w-full rounded-3xl border border-black object-cover sm:w-2/5'
                />
              </div>
              {i + 1 < projects.length && <Separator />}
            </Fragment>
          )
        })}
      </div>
    </Container>
  )
}

export default ProjectShowcase
