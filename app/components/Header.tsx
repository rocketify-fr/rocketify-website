import { useLocation } from '@remix-run/react'
import clsx from 'clsx'

import { Logo } from '~/components/Logo'
import { ThemeToggle } from '~/components/ThemeToggle'

import { Link } from './Link'

export function Header({ theme, data }) {
  const location = useLocation()
  console.log(JSON.stringify(data, null, 2))

  // const current = data.menu.find((menu) => {
  //   if (menu.linkType !== 'internal') {
  //     return false
  //   }
  //
  //   const match = menu.internal.slug === location.pathname.slice(1)
  //
  //   if (match) {
  //     return match
  //   }
  //
  //   return menu.internal.slug === null && location.pathname === '/'
  // })

  return (
    <header className='border-b border-black transition-colors duration-1000 ease-in-out dark:border-gray-900'>
      <div className='container m-auto flex h-[80px] items-center justify-between'>
        <Logo />
        <div className='text-buttonLabelNav flex items-center space-x-16'>
          <ThemeToggle theme={theme} />
        </div>
      </div>
    </header>
  )
}
