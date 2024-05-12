import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'

export function Logo({ className = null }) {
  const {
    initial: {
      data: {
        header: { logo },
      }
    }
  } = useLoaderData()
  return (
    <Link to='/' className={clsx('min-h-[42px] min-w-[167px]', className)}>
      <img src={logo.url} alt={logo.alt} height={42} width={167} />
    </Link>
  )
}
