import { Link as RemixLink, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { ThemeToggle } from '~/components/ThemeToggle'

import Container from './Container'
import { Link } from './Link'

const BasicLink = ({ menu, sub, active }) => {
  const title = menu.title || menu.internal.title
  return (
    <Link
      link={menu}
      key={menu.internal.slug}
      className={clsx('relative flex items-center justify-end  text-black')}
    >
      <span
        data-content={title}
        className={clsx(
          'menu-link rounded-3xl border py-2',
          active && 'font-bold',
          sub ? 'w-60' : '',
          menu._type === 'ctaButton'
            ? 'border-black bg-rGreen px-3 hover:bg-rGreenHover'
            : 'border-transparent bg-white'
        )}
      >
        {title}
      </span>
    </Link>
  )
}

const NavLink = ({ menu, sub }) => {
  const location = useLocation()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (menu._type === 'nav') {
      setActive(location.pathname.includes(menu.menu[0].internal.type))
    } else if (
      location.pathname === '/' &&
      menu._type === 'customLink' &&
      !menu.internal?.slug
    ) {
      setActive(true)
    } else {
      setActive(location.pathname.includes(menu.internal?.slug))
    }
  }, [location.pathname, menu])

  return (
    <div className='flex gap-1'>
      <img
        src='/img/bullet.svg'
        height={16}
        alt=''
        className={clsx('opacity-0', active && 'opacity-100', sub && 'hidden')}
      />
      {menu._type === 'nav' ? (
        <div className='menu-link group relative'>
          <span
            className={clsx('flex cursor-pointer gap-2', active && 'font-bold')}
          >
            <span>{menu.title}</span>
            <img
              src='/img/chevron-up.svg'
              width={12}
              className='rotate-180 transition-all group-hover:rotate-0'
              alt=''
            />
          </span>
          <div className='absolute top-6 z-10 flex max-h-0 flex-col items-start overflow-y-hidden rounded-2xl border border-transparent bg-transparent p-2 transition-all duration-1000 group-hover:max-h-dvh group-hover:border-black group-hover:bg-white group-hover:p-4'>
            {new Array(6).fill(menu.menu[0]).map((link, i, col) => (
              <>
                <NavLink key={link.internal.slug} menu={link} sub />
                {i + 1 < col.length && (
                  <div className='my-1 h-px w-full border-b border-b-black bg-white'></div>
                )}
              </>
            ))}
          </div>
        </div>
      ) : (
        <BasicLink {...{ menu, sub, active }} />
      )}
    </div>
  )
}

export function Header({ theme, data }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const { logo } = data

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <>
      <header className='border-b border-black transition-colors duration-1000 ease-in-out dark:border-gray-900'>
        <Container className='m-auto flex h-[80px] items-center justify-between'>
          <RemixLink to='/' className={clsx('min-h-[42px] min-w-[167px]')}>
            <img src={logo.url} alt={logo.alt} height={42} width={167} />
          </RemixLink>
          <img
            src='/img/hamburger.svg'
            alt='menu'
            className='cursor-pointer sm:hidden'
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <div className='hidden items-center gap-4 sm:flex'>
            {data.menu.map((entry, i) => {
              return <NavLink key={i} menu={entry} />
            })}
            <ThemeToggle theme={theme} />
          </div>
        </Container>
      </header>
      <div
        className={clsx(
          menuOpen ? 'h-full' : 'h-0',
          'absolute top-[80px] flex w-full flex-col items-end justify-start gap-4 overflow-hidden bg-white p-4 text-2xl transition-all'
        )}
      >
        {data.menu.map((entry, i) => {
          return <NavLink key={i} menu={entry} />
        })}
      </div>
    </>
  )
}
