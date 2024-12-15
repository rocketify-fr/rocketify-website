import { PortableText } from '@portabletext/react'

import { useRootLoaderData } from '~/lib/useRootLoaderData'

import Container from '../Container'
import { useTranslations } from '../contexts/translations'
import { SimpleLink } from '../Link'
import { PreHeader } from '../post/BlogHeader'
import { Breadcrumbs } from '../post/Breadcrumbs'
import { Share } from '../Share'
import PostCard from './BlogCard'

const BlogPost = ({ post: postData }) => {
  const {
    title,
    tags,
    estimatedReadingTime,
    image,
    _createdAt,
    slug,
    content,
    relatedPosts,
  } = postData

  const { t } = useTranslations()
  const { url } = useRootLoaderData()

  return (
    <>
      <Container className='flex flex-col'>
        <Breadcrumbs parent={{ label: t('blog.backToPosts') }}></Breadcrumbs>
        <PreHeader
          tags={tags}
          estimatedReadingTime={estimatedReadingTime}
        ></PreHeader>
        <h1 className='py-2 font-bai text-6xl'>{title}</h1>
        <div className='flex w-full flex-col py-4'>
          <img
            src={image.url}
            alt={image.alt}
            className='my-4 aspect-video rounded-3xl border border-black object-cover'
          />
          <div className='flex justify-between py-4'>
            <div className='flex flex-col'>
              <span className='text-sm'>{t('blog.publishedOn')}</span>
              <span className='text-sm font-[500]'>
                {new Date(_createdAt).toLocaleDateString()}
              </span>
            </div>
            <Share url={url} title={title}></Share>
          </div>
        </div>
        <div className='post-content mx-auto max-w-[870px] py-8'>
          <PortableText value={content}></PortableText>
        </div>
      </Container>
      {relatedPosts?.length > 0 && (
        <>
          <div className='my-16 h-px w-full bg-black'></div>
          <Container className='flex flex-col'>
            <h2 className='font-bai text-5xl'>{t('blog.relatedPosts')}</h2>
            <div className='flex items-end justify-between'>
              <div>{t('blog.relatedPostsDescription')}</div>
              <SimpleLink
                to='/blog'
                className='rounded-3xl border border-black bg-rGreen px-4 py-2'
              >
                {t('blog.viewAll')}
              </SimpleLink>
            </div>
            <div className='grid grid-cols-3 gap-4 pt-16'>
              {relatedPosts.map((related, i) => (
                <PostCard key={i} post={related}></PostCard>
              ))}
            </div>
          </Container>
        </>
      )}
    </>
  )
}

export default BlogPost
