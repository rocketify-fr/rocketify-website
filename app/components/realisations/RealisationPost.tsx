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
  return (
    <>
      <Container className='flex flex-col'>
        <Breadcrumbs></Breadcrumbs>
        <div className='flex w-full flex-col items-end gap-8 sm:flex-row'>
          <div className='flex flex-col gap-4 sm:w-1/2'>
            <h1 className='py-2 font-bai text-3xl lg:text-6xl'>{title}</h1>
            <Tags tags={tags} />
          </div>
          <div className='flex flex-col items-start sm:w-1/2'>
            <p className='py-2 text-lg'>{description}</p>
            <Button className='bg-rPurple'>
              <a target='_blank' href={url} rel='noreferrer'>
                Visiter le site
              </a>
            </Button>
          </div>
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
      {moreDetailsPosts?.length > 0 && (
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
            <div className='flex items-end justify-between'>
              <div>hardcoded lorem ipsum lol</div>
            </div>
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
