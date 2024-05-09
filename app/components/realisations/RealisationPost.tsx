import { PortableText } from '@portabletext/react'
import { Link } from '@remix-run/react'
import clsx from 'clsx'

import Container, { Page } from '~/components/Container'
import PostCard from '~/components/post/PostCard'
import {
  Breadcrumbs,
  PreHeader,
  Share,
  Tags,
} from '~/components/post/PostComponents'

import { PostContent } from '../content/PostContent'
import Button from '../layout/Button'
import { UseCaseIntro } from './RealisationUseCase'

const RealisationPost = ({ post: postData }) => {
  console.log({ postData })
  const {
    title,
    tags,
    url,
    description,
    image,
    intro,
    _createdAt,
    slug,
    content,
    relatedPosts,
    ...rest
  } = postData
  return (
    <>
      <Container className='flex flex-col'>
        <Breadcrumbs></Breadcrumbs>
        <div className='flex w-full items-end'>
          <div className='w-1/2'>
            <h1 className='py-2 font-bai text-6xl'>{title}</h1>
            <Tags tags={tags} />
          </div>
          <div className='flex w-1/2 flex-col items-start'>
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
          className='my-16 aspect-[21/9] rounded-3xl border border-black object-cover'
        />
      </Container>
      <UseCaseIntro {...intro} />
      <div className='my-16 flex flex-col gap-16'>
        <PostContent content={content}></PostContent>
      </div>
      <pre>{JSON.stringify({ rest, postData }, null, 2)}</pre>
      {relatedPosts?.length > 0 && (
        <>
          <div className='my-16 h-px w-full bg-black'></div>
          <Container className='flex flex-col'>
            <h2 className='font-bai text-5xl'>Related posts</h2>
            <div className='flex items-end justify-between'>
              <div>hardcoded lorem ipsum lol</div>
              <Link
                to='/blog'
                className='rounded-3xl border border-black bg-rGreen px-4 py-2'
              >
                Voir tous les articles
              </Link>
            </div>
            <div className='grid grid-cols-3 gap-4 pt-16'>
              {relatedPosts.map((related) => (
                <PostCard post={related}></PostCard>
              ))}
            </div>
          </Container>
        </>
      )}
    </>
  )
}

export default RealisationPost
