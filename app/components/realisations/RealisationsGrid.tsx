import { Link, useLocation, useNavigate } from '@remix-run/react'
import queryString from 'query-string'
import { useMemo } from 'react'

import { updateQuery } from '~/utils/location'

import Container, { Page } from '~/components/Container'
import Button from '~/components/layout/Button'
import ResponsiveGrid from '~/components/layout/ResponsiveGrid'
import RealisationCard from './RealisationCard'

type PostsProps = {
  realisations: Array<any>
}

export default function RealisationsGrid(props: PostsProps) {
  const { realisations = [] } = props

  const location = useLocation()
  const navigate = useNavigate()

  const filters = useMemo(() => {
    const { page } = queryString.parse(location.search)
    return { page: +page }
  }, [location.search])


  return (
    <Container>
      <h1 className='font-bai text-6xl lg:w-1/2'>
        Contenu codé en dur pour tester les vues
      </h1>
      <p className='pb-16 text-lg lg:w-1/2'>
        il faut générer du texte comme un lorem ipsum : Ceci est un texte pour
        remplir le contenu. Il faut ici générer du texte pour le contenu de la
        page. Sinon, il faut générer du texte pour remplir la page. <br />
        Gentil Tabby.
      </p>

      <RealisationCard realisation={realisations[0]}></RealisationCard>
      <ResponsiveGrid gapsX={4} gapsY={8} className='mt-8'>
        {new Array(9).fill(realisations[0]).map(r => (
          <RealisationCard realisation={r}></RealisationCard>

        ))}
      </ResponsiveGrid>
      <div className='flex items-center justify-end gap-2 py-8'>

        <Button
          className='mr-4 cursor-pointer'
          disabled={filters.page === 1 || !filters.page}
        >
          <Link to={`/realisations?${updateQuery(location, { page: filters.page - 1 })}`}>
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

