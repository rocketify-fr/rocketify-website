import { Link, useLoaderData, useLocation, useNavigate } from '@remix-run/react'
import queryString from 'query-string'
import { useMemo } from 'react'

import { updateQuery } from '~/utils/location'

import Container, { Page } from '~/components/Container'
import Button from '~/components/layout/Button'
import ResponsiveGrid from '~/components/layout/ResponsiveGrid'
import RealisationCard from './RealisationCard'
import { useQuery } from '@sanity/react-loader'

type PostsProps = {
  realisations: Array<any>
}

export default function RealisationsGrid() {
  const { initial, query, params, pageData } = useLoaderData()
  const { data  } = useQuery(
    query,
    params,
    {
      initial,
    }
  )

  const  realisations = data || initial.data || []

  const location = useLocation()
  const navigate = useNavigate()

  const filters = useMemo(() => {
    const { page } = queryString.parse(location.search)
    return { page: +page }
  }, [location.search])


  return (
    <Container>
      <RealisationCard realisation={realisations[0]}></RealisationCard>
      <ResponsiveGrid gapsX={4} gapsY={8} className='mt-8'>
        {realisations.slice(1).map((r,i) => (
          <RealisationCard key={i} realisation={r}></RealisationCard>

        ))}
      </ResponsiveGrid>
    </Container>
  )
}

