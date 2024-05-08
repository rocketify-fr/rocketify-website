import {Link} from '@remix-run/react'
import urlBuilder from '@sanity/image-url'
import type {EncodeDataAttributeCallback} from '@sanity/react-loader'

import {dataset, projectId} from '~/sanity/projectDetails'
import type {POST_QUERYResult} from '~/types/sanity.types'

import {RecordCover} from './RecordCover'

type PostProps = {
  post: POST_QUERYResult[]
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Post(props: PostProps) {
  const {post = [], encodeDataAttribute} = props

  return post.length > 0 ? (
    <div>
      <div
        className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90"
        data-sanity={encodeDataAttribute?.([postI, 'image'])}
      >
        <div className="absolute z-0 h-48 w-[200%] translate-x-20 translate-y-20 -rotate-45 bg-gradient-to-b from-white to-transparent opacity-25 mix-blend-overlay transition-transform duration-500 ease-in-out group-hover:translate-x-10 group-hover:translate-y-10 group-hover:opacity-75" />
      </div>
      {post?.slug ? (
        <Link prefetch="intent" to={post?.slug}>
          <RecordCover image={post.image} />
        </Link>
      ) : (
        <RecordCover image={post.image} />
      )}
      <div className="flex flex-col">
        {post?.slug ? (
          <Link
            prefetch="intent"
            to={post?.slug}
            className="text-bold pt-4 text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white lg:text-3xl"
          >
            {post.title}
          </Link>
        ) : (
          <span className="pt-4 text-xl font-bold tracking-tighter">
            {post.title}
          </span>
        )}
        {post?.author ? (
          <span className="bg-black font-bold leading-none tracking-tighter text-white dark:bg-white dark:text-black">
            {post.author}
          </span>
        ) : null}
      </div>
      {post?.authorImage ? (
        <img
          className="h-auto w-full object-cover shadow-black transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-200"
          src={urlBuilder({projectId, dataset})
            .image(post?.authorImage)
            .height(800)
            .width(800)
            .fit('max')
            .auto('format')
            .url()}
          alt={post?.authorImage?.alt ?? ``}
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500">
          Missing Author image
        </div>
      )}
      <div>Temps de lecture: {post?.estimatedReadingTime} minutes</div>
      <div>Date: {post?._updatedAt} </div>
      <div>Description: {post?.description} </div>
      <div>Catégorie: {post?.tags[0].title} </div>
    </div>
  ) : (
    <div className="prose prose-xl mx-auto bg-green-50 p-4">
      <p>No posts found, yet!</p>
      <p>
        <a href="/studio">Log in to your Sanity Studio</a> and start creating
        content!
      </p>
      <p>Or, run </p>
      <pre>
        <code>
          npx sanity@latest exec ./scripts/createData.ts --with-user-token
        </code>
      </pre>
      <p>
        from the command line to delete existing documents populate the site
        with content.{' '}
      </p>
    </div>
  )
}
