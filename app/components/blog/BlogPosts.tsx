import { Link, redirect, useLocation, useNavigate } from '@remix-run/react'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import queryString from 'query-string'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { POSTS_QUERYResult } from '~/types/sanity.types'
import { updateQuery } from '~/utils/location'

import Container from '../Container'
import Button from '../layout/Button'
import ResponsiveGrid from '../layout/ResponsiveGrid'
import { Tags } from '../post/Tags'
import PostCard from './BlogCard'

type PostsProps = {
  posts: POSTS_QUERYResult[]
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export default function BlogPosts(props: PostsProps) {
  const { posts = [] } = props

  const location = useLocation()
  const navigate = useNavigate()

  const [tags, setTags] = useState([
    {
      title: 'Shopify',
      slug: 'shopify',
    },
    {
      title: 'Sanity',
      slug: 'sanity',
    },
    {
      title: 'Gatsby',
      slug: 'gatsby',
    },
    {
      title: 'Remix',
      slug: 'remix',
    },
  ])

  const toggleActive = useCallback(
    (index, value = null) =>
      setTags(
        tags.map((tag, i) =>
          i === index
            ? { ...tag, active: value || !tag.active }
            : { ...tag, active: false }
        )
      ),
    [tags]
  )

  const handleSort = useCallback(
    (e) => {
      const [sortBy, sortOrder] = e.target.value.split('.')

      navigate(`/blog?${updateQuery(location, { sortBy, sortOrder })}`)
    },
    [location.search]
  )

  useEffect(() => {
    const query = queryString.parse(location.search)
    if (query.tag) {
      const active = tags.findIndex((tag) => tag.title === query.tag)
      if (active !== -1) {
        toggleActive(active, true)
      }
    } else {
      setTags(tags.map((tag) => ({ ...tag, active: false })))
    }
  }, [location.search])

  const filters = useMemo(() => {
    const { sortBy, sortOrder, page } = queryString.parse(location.search)
    return { sortBy, sortOrder, page: +page }
  }, [location.search])

  return (
      <Container>
        <h1 className='font-bai text-6xl lg:w-1/2'>
          Contenu codé en dur pour tester les vues
        </h1>
        <p className='pb-16 text-lg lg:w-1/2'>
          il faut générer du texte comme un lorem ipsum : Ceci est un texte pour
          remplir le contenu. Il faut ici générer du texte pour le contenu de la
          page. Sinon, il faut générer du texte pour remplir la page.
        </p>
        <div className='flex items-center justify-between'>
          <Tags className='py-8' tags={tags}></Tags>
          <Button>
            <select
              id='sort'
              name='sort'
              onChange={handleSort}
              className='border-none bg-white text-xs'
              value={`${filters.sortBy || 'date'}.${filters.sortOrder || 'desc'}`}
            >
              <option value='date.desc'>Date décroissante</option>
              <option value='date.asc'>Date croissante</option>
              <option value='view.desc'>Vues décroissantes</option>
              <option value='view.asc'>Vues croissantes</option>
            </select>
          </Button>
        </div>
        <PostCard horizontal post={posts?.[0]}></PostCard>
        <ResponsiveGrid gapsX={4} gapsY={8} className='mt-8'>
          {new Array(9).fill(posts[1]).map((post) => (
            <PostCard post={post}></PostCard>
          ))}
        </ResponsiveGrid>
        <div className='flex items-center justify-end gap-2 py-8'>

          <Button
            className='mr-4 cursor-pointer'
            disabled={filters.page === 1 || !filters.page}
          >
            <Link to={`/blog?${updateQuery(location, {page: filters.page - 1})}`}>
            Précédent
            </Link>
          </Button>
          <Button className='cursor-pointer bg-rGreen'>1</Button>
          <Button className='cursor-pointer '>2</Button>
          <Button className='cursor-pointer '>3</Button>
          <Button className='cursor-pointer '>4</Button>
          <Button className='ml-4 cursor-pointer bg-rGreen'>Suivant</Button>
        </div>
      </Container>
  )
}