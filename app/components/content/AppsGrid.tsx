import { useLoaderData, useLocation, useNavigate } from '@remix-run/react'

import AppCard from '../apps/AppCard'
import Container from '../Container'
import ResponsiveGrid from '../layout/ResponsiveGrid'

const AppsGrid = ({ ...gridConfig }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { appsData } = useLoaderData()

  return (
    <Container>
      {appsData.length > 0 ? (
        <>
          <ResponsiveGrid gapsX={4} gapsY={8} className='mt-8'>
            {appsData.map((app, i) => (
              <AppCard key={i} app={app}></AppCard>
            ))}
          </ResponsiveGrid>
        </>
      ) : (
        'Aucune app trouvée'
      )}
    </Container>
  )
}

export default AppsGrid
