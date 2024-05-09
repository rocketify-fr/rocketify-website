import { PortableText } from '@portabletext/react'
import { Link } from '@remix-run/react'

import Container, { Page } from '~/components/Container'
import PostCard from '~/components/post/PostCard'
import {
  Breadcrumbs,
  PreHeader,
  Share,
  Tags,
} from '~/components/post/PostComponents'

import Button from '../layout/Button'

const RealisationPost = ({ post: postData }) => {
  console.log({ postData })
  const {
    title,
    tags,
    description,
    image,
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
            <Button></Button>
          </div>
        </div>
        <div className='flex w-full flex-col py-4'>
          <img
            src={image.url}
            alt={image.alt}
            className='my-4 aspect-[21/9] rounded-3xl border border-black object-cover'
          />
          <div className='flex justify-between py-4'>
            <div className='flex flex-col'>
              <span className='text-sm'>Published on</span>
              <span className='text-sm font-[500]'>
                {new Date(_createdAt).toLocaleDateString()}
              </span>
            </div>
            <Share url={`/blog/${slug}`}></Share>
          </div>
        </div>
        <pre>{JSON.stringify(rest, null, 2)}</pre>
        <div className='post-content mx-auto max-w-[870px] py-8'>
          <PortableText value={content}></PortableText>
        </div>
      </Container>
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
