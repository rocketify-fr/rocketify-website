import { Link as RemixLink, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import Container from './Container'
import BulletIcon from './icons/Bullet'
import ChevronIcon from './icons/Chevron'
import HamburgerIcon from './icons/Hamburger'
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
          'menu-link border py-2',
          active && 'sm:font-bold',
          sub ? 'sm:w-60' : '',
          menu._type === 'ctaButton'
            ? 'rounded-3xl border-black bg-rGreen px-3 hover:bg-rGreenHover '
            : 'border-transparent'
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
  const [open, setOpen] = useState(false)

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

  useEffect(() => {
    setOpen(false)
  }, [location])
  return (
    <div className='flex items-center gap-1'>
      {menu._type !== 'ctaButton' && (
        <BulletIcon
          className={clsx(
            'hidden opacity-0 sm:block',
            active && 'opacity-100',
            sub && 'hidden'
          )}
        />
      )}
      {menu._type === 'nav' ? (
        <div className='menu-link group relative w-full '>
          <span
            onClick={() => setOpen(!open)}
            className={clsx(
              'flex cursor-pointer items-center justify-between gap-2 py-2',
              active && 'sm:font-bold'
            )}
          >
            <span>{menu.title}</span>
            <ChevronIcon
              className={clsx(
                'transition-all sm:rotate-180 group-hover:sm:rotate-0',
                open && 'rotate-180'
              )}
            />
          </span>
          <div
            className={clsx(
              'max-h-0 overflow-y-hidden pl-4 transition-all sm:hidden',
              open && 'max-h-dvh py-2'
            )}
          >
            {menu.menu.map((link, i, col) => (
              <>
                <NavLink key={link.internal.slug} menu={link} sub />
              </>
            ))}
          </div>
          <div className='absolute top-6 z-10 hidden max-h-0 flex-col items-start overflow-y-hidden rounded-2xl border border-transparent p-0 opacity-0 transition-all duration-500 group-hover:max-h-dvh group-hover:border-black group-hover:bg-white group-hover:p-4 group-hover:opacity-100 sm:flex'>
            {menu.menu.map((link, i, col) => (
              <>
                <NavLink key={link.internal.slug} menu={link} sub />
                {i + 1 < col.length && (
                  <div className='my-1 h-px w-full border-b border-b-black'></div>
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
      <header className='max-w-[100dvw] border-b border-black transition-all duration-1000 ease-in-out dark:border-gray-900'>
        <Container className='m-auto flex h-[80px] items-center justify-between'>
          <RemixLink to='/' className={clsx('min-h-[42px] min-w-[167px]')}>
            <img src={logo.url} alt={logo.alt} height={42} width={167} />
          </RemixLink>
          <HamburgerIcon
            className='cursor-pointer sm:hidden'
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <div className='hidden items-center gap-4 sm:flex'>
            {data.menu.map((entry, i) => {
              return <NavLink key={i} menu={entry} />
            })}
          </div>
        </Container>
      </header>
      <div
        className={clsx(
          menuOpen ? 'h-dvh py-12' : 'h-0 py-0',
          'absolute top-[81px] flex w-full max-w-[100dvw] flex-col items-start justify-start gap-4 overflow-hidden bg-white px-12 text-paragraph transition-all duration-500'
        )}
      >
        {data.menu.map((entry, i) => {
          return <NavLink key={i} menu={entry} />
        })}
      </div>
    </>
  )
}
