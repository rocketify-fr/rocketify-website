import { Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react'
import { useQuery } from '@sanity/react-loader'
import queryString from 'query-string'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { getLocalizedPath } from '~/utils/language'
import { updateQuery } from '~/utils/location'

import PostCard from '../blog/BlogCard'
import Container from '../Container'
import Button from '../layout/Button'
import ResponsiveGrid from '../layout/ResponsiveGrid'
import { Tags } from '../post/Tags'

const BlogPostsGrid = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { initial, params, pageData, query, tagsData } = useLoaderData()

  const { data: posts } = useQuery(query, params, {
    initial,
  })

  const gridConfig = pageData.content.find(
    (item) => item._type === 'blogPostsGrid'
  )

  const [tags, setTags] = useState(tagsData)

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
      const sortBy = e.target.value

      navigate(
        `${getLocalizedPath(pageData.language, '/blog')}?${updateQuery(location, { sortBy })}`,
        {
          preventScrollReset: true,
        }
      )
    },
    [location, navigate, pageData.language]
  )

  useEffect(() => {
    const query = queryString.parse(location.search)
    if (query.tag) {
      const active = tagsData.findIndex((tag) => tag.title === query.tag)
      if (active !== -1) {
        toggleActive(active, true)
      }
    } else {
      setTags(tagsData.map((tag) => ({ ...tag, active: false })))
    }
  }, [location.search])

  const filters = useMemo(() => {
    const { sortBy, sortOrder, page } = queryString.parse(location.search)
    return { sortBy, sortOrder, page: +page }
  }, [location.search])

  const basePath = useMemo(
    () => getLocalizedPath(pageData.language, '/blog'),
    [pageData.language]
  )
  return (
    <Container>
      <div className='flex items-center justify-between py-8'>
        <Tags tags={tags}></Tags>
        {gridConfig.showSort && (
          <Button>
            <select
              id='sort'
              name='sort'
              onChange={handleSort}
              className='border-none bg-white text-xs'
              value={filters.sortBy}
            >
              <option value='new'>Date décroissante</option>
              <option value='old'>Date croissante</option>
            </select>
          </Button>
        )}
      </div>
      {posts.length > 0 ? (
        <>
          <PostCard horizontal post={posts?.[0]}></PostCard>
          <ResponsiveGrid gapsX={4} gapsY={8} className='mt-8'>
            {posts.slice(1).map((post, i) => (
              <PostCard key={i} post={post}></PostCard>
            ))}
          </ResponsiveGrid>
        </>
      ) : (
        'Aucun post trouvé'
      )}
      {gridConfig.showPagination && (
        <div className='flex items-center justify-end gap-2 py-8'>
          <Button
            className='mr-4 cursor-pointer'
            disabled={filters.page === 1 || !filters.page}
          >
            <Link
              to={`$${basePath}?${updateQuery(location, { page: filters.page - 1 })}`}
            >
              Précédent
            </Link>
          </Button>
          <Button className='cursor-pointer bg-rGreen'>1</Button>
          <Button className='cursor-pointer '>2</Button>
          <Button className='cursor-pointer '>3</Button>
          <Button className='cursor-pointer '>4</Button>
          <Button className='ml-4 cursor-pointer bg-rGreen'>Suivant</Button>
        </div>
      )}
    </Container>
  )
}

export default BlogPostsGrid
