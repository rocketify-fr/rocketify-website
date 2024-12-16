import clsx from 'clsx'
import { Fragment } from 'react/jsx-runtime'

import Container from '../Container'
import { useTranslations } from '../contexts/translations'
import Button from '../layout/Button'
import { SimpleLink } from '../Link'
import { Tags } from '../post/Tags'
import Separator from '../Separator'

const ProjectShowcase = ({ title, description, projects }) => {
  const { t } = useTranslations()
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
                  'flex flex-col gap-6 lg:flex-row lg:gap-12',
                  i % 2 !== 0 && 'lg:flex-row-reverse'
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
                    <SimpleLink to={`/realisations/${slug}`}>
                      {t('project.view')}
                    </SimpleLink>
                  </Button>
                </div>
                <img
                  src={image.url}
                  alt={image.alt}
                  className='aspect-square w-full rounded-3xl border border-black object-cover lg:w-2/5'
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
