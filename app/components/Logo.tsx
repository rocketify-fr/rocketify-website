import { Link, useLoaderData } from '@remix-run/react'

export function Logo() {
  const {
    initial: {
      data: {
        header: { logo },
      },
    },
  } = useLoaderData()
  return (
    <p className='text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl'>
      <Link to='/'>
        <img src={logo.url} alt={logo.alt} height={42} width={167} />
      </Link>
    </p>
  )
}
