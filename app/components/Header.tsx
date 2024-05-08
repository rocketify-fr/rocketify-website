import { useLocation } from '@remix-run/react'
import clsx from 'clsx'

import { Logo } from '~/components/Logo'
import { ThemeToggle } from '~/components/ThemeToggle'

import { Link } from './Link'

export function Header({ theme, data }) {
  const location = useLocation()

  const current = data.menu.find((menu) => {
    if (menu.linkType !== 'internal') {
      return false
    }

    const match = menu.internal.slug === location.pathname.slice(1)

    if (match) {
      return match
    }

    return menu.internal.slug === null && location.pathname === '/'
  })

  return (
    <header className='border-b border-black transition-colors duration-1000 ease-in-out dark:border-gray-900'>
      <div className='container mx-auto flex items-center justify-between h-[80px] my-auto'>
        <Logo />
        <div className='flex space-x-16 items-center text-buttonLabelNav'>
          {data.menu.map((menu, i) => {
            const { slug, title } = menu.internal
            const active =
              menu.linkType === 'internal' && slug === current.internal.slug
            const isLast = i === data.menu.length - 1

            return (
              <Link
                link={menu}
                className={clsx(
                  isLast && 'border border-black rounded-3xl bg-rGreen px-4',
                  `py-2 flex items-center justify-center space-x-2 relative`
                )}
              >
                {active && (
                  <img
                    src='/img/bullet.svg'
                    height={16}
                    alt=''
                    className='absolute -left-6 top-1/2 -translate-y-1/2'
                  />
                )}
                <span
                  className={clsx(
                    active && 'font-bold',
                    `before:font-bold before:content-['${title}'] before:block before:h-0 before:overflow-hidden before:invisible`
                  )}
                >
                  {title}
                </span>
              </Link>
            )
          })}
          <ThemeToggle theme={theme} />
        </div>
      </div>
    </header>
  )
}
