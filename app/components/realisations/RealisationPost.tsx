import Container from '~/components/Container'

import HeroSection from '../content/HeroSection'
import { PostContent } from '../content/PostContent'
import Testimonials from '../content/Testimonials'
import Button from '../layout/Button'
import { Breadcrumbs } from '../post/Breadcrumbs'
import { Tags } from '../post/Tags'
import Separator from '../Separator'
import RealisationCard from './RealisationCard'
import { UseCaseIntro } from './RealisationUseCase'

const RealisationPost = ({ post: postData }) => {
  const {
    title,
    tags,
    url,
    description,
    image,
    intro,
    testimonial,
    content,
    moreDetailsPosts,
    similarProjectPosts,
    heroSection,
  } = postData

  const [bigTitle, subTitle] = title.split(' | ')
  return (
    <>
      <Container className='flex flex-col'>
        <Breadcrumbs></Breadcrumbs>
        <div className='flex flex-col gap-4 py-8 2xl:flex-row 2xl:gap-16'>
          <h1 className='font-bai text-3xl lg:text-6xl 2xl:w-1/3'>
            {bigTitle}
          </h1>
          <div className='flex flex-col 2xl:w-2/3'>
            <h2 className='pb-4 font-bai text-2xl 2xl:text-4xl'>{subTitle}</h2>

            <Tags tags={tags} />
          </div>
        </div>
        <div className='flex flex-col items-start xl:w-2/3'>
          <p className='py-2 text-lg'>{description}</p>
          <Button className='mt-4 bg-rPurple'>
            <a target='_blank' href={url} rel='noreferrer'>
              Visiter le site
            </a>
          </Button>
        </div>
        <img
          src={image.url}
          alt={image.alt}
          className='my-16 aspect-[4/3] rounded-3xl border border-black object-cover lg:aspect-[21/9]'
        />
      </Container>
      <UseCaseIntro {...intro} />
      <div className='my-16 flex flex-col gap-16'>
        <PostContent content={content}></PostContent>
      </div>
      <div className='my-16 flex flex-col gap-16'>
        <Testimonials
          testimonials={testimonial}
          title="Retour d'expérience"
          subTitle='Lorem ipsum à la mano'
        ></Testimonials>
      </div>
      {moreDetailsPosts?.length > 0 && false && (
        <>
          <Separator></Separator>
          <Container className='flex flex-col'>
            <h2 className='font-bai text-2xl sm:text-5xl'>Plus en détail</h2>
            <div className='flex items-end justify-between'>
              <div>hardcoded lorem ipsum lol</div>
            </div>
            <div className='grid grid-cols-1 gap-4 pt-16 sm:grid-cols-2 lg:grid-cols-3'>
              {moreDetailsPosts.map((realisation, i) => (
                <RealisationCard
                  key={i}
                  realisation={realisation}
                ></RealisationCard>
              ))}
            </div>
          </Container>
        </>
      )}
      {similarProjectPosts?.length > 0 && (
        <>
          <Separator></Separator>
          <Container className='flex flex-col'>
            <h2 className='font-bai text-2xl sm:text-5xl'>
              Projets similaires
            </h2>
            <div className='grid grid-cols-1 gap-4 pt-16 sm:grid-cols-2'>
              {similarProjectPosts.map((realisation, i) => (
                <RealisationCard
                  key={i}
                  realisation={realisation}
                ></RealisationCard>
              ))}
            </div>
          </Container>
        </>
      )}
      <Separator></Separator>
      <HeroSection {...heroSection[0]}></HeroSection>
    </>
  )
}

export default RealisationPost
