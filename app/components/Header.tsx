import {
  useLoaderData,
  useLocation,
  useNavigate,
  useRevalidator,
  useRouteLoaderData,
} from '@remix-run/react'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'

import { extendedLanguages, getLocalizedPath } from '~/utils/language'

import Container from './Container'
import { useTranslations } from './contexts/translations'
import BulletIcon from './icons/Bullet'
import ChevronIcon from './icons/Chevron'
import HamburgerIcon from './icons/Hamburger'
import { Link, SimpleLink } from './Link'

const BasicLink = ({ menu, sub, active }) => {
  const title = menu.title || menu.internal.title
  return (
    <Link
      link={menu}
      key={menu.internal.slug}
      className={clsx(
        active && 'sm:font-semibold',
        'relative flex items-center justify-end  text-nowrap text-black'
      )}
    >
      <span
        data-active={active}
        data-content={title}
        className={clsx(
          'menu-link text-nowrap border py-2',
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
  const { language } = useRouteLoaderData('root')

  useEffect(() => {
    if (menu._type === 'nav') {
      setActive(location.pathname.includes(menu.menu[0].internal.type))
    } else if (
      location.pathname === getLocalizedPath(language, menu.internal?.slug)
    ) {
      setActive(true)
    } else if (
      menu.internal.slug === 'blog' &&
      location.pathname.includes('/blog')
    ) {
      setActive(true)
    } else {
      const lastSegment = location.pathname.split('/').reverse()[0]
      setActive(lastSegment === menu.internal.slug)
    }
  }, [language, location.pathname, menu])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <div className='flex items-center gap-1' data-active={active}>
      {menu._type === 'nav' ? (
        <div className='menu-link group relative w-full '>
          <span
            onClick={() => setOpen(!open)}
            className={clsx(
              'flex cursor-pointer items-center justify-between gap-2 text-nowrap py-2',
              active && 'sm:font-semibold'
            )}
          >
            <span className='text-nowrap'>{menu.title}</span>
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
              <NavLink key={link.internal.slug} menu={link} sub />
            ))}
          </div>
          <div className='absolute top-12  z-10 hidden max-h-0 -translate-x-1/4 flex-col items-start overflow-y-hidden rounded-2xl border border-transparent p-0 opacity-0 transition-all duration-500 group-hover:max-h-dvh group-hover:border-black group-hover:bg-white group-hover:p-4 group-hover:opacity-100 sm:flex'>
            {menu.menu.map((link, i, col) => (
              <Fragment key={link.internal.slug}>
                <NavLink menu={link} sub />
                {i + 1 < col.length && (
                  <div className='my-1 h-px w-full border-b border-b-black'></div>
                )}
              </Fragment>
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
  const { languages, language } = useTranslations()
  const navigate = useNavigate()
  const revalidator = useRevalidator()

  useEffect(() => {
    setMenuOpen(false)
  }, [])

  const handleLanguageChange = (language) => {
    const currentPath = window.location.pathname
    let prefix = ''
    if (currentPath.includes('/blog') && !currentPath.endsWith('/blog')) {
      prefix = 'blog/'
    } else if (
      currentPath.includes('/services') &&
      !currentPath.endsWith('/services')
    ) {
      prefix = 'services/'
    } else if (
      currentPath.includes('/apps') &&
      !currentPath.endsWith('/apps')
    ) {
      prefix = 'apps/'
    } else if (
      currentPath.includes('/realisations') &&
      !currentPath.endsWith('/realisations')
    ) {
      prefix = 'realisations/'
    }

    const path = getLocalizedPath(
      language.language,
      `${prefix}${language.slug}`
    )

    setMenuOpen(false)
    navigate(path)
    revalidator.revalidate()
  }

  if (!data) {
    return null
  }

  const { logo } = data
  return (
    <>
      <header className='max-w-[100dvw] border-b border-black transition-all duration-1000 ease-in-out dark:border-gray-900'>
        <Container className='m-auto flex h-[80px] items-center justify-between'>
          <SimpleLink to='/' className={clsx('min-h-[42px] min-w-[167px]')}>
            <img src={logo.url} alt={logo.alt} height={42} width={167} />
          </SimpleLink>
          <HamburgerIcon
            className='cursor-pointer sm:hidden'
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <div className='hidden items-center gap-8 sm:flex'>
            {data.menu.map((entry, i) => {
              return <NavLink key={i} menu={entry} />
            })}
            <div className='group cursor-pointer rounded-xl border-gray-200 bg-white hover:divide-y '>
              <div className='flex items-center gap-4 px-4 py-2'>
                {languages.length > 1 && (
                  <>
                    <span>
                      {extendedLanguages
                        .find((lang) => lang.id === language)
                        .id.toUpperCase()}
                    </span>

                    <ChevronIcon
                      className={clsx(
                        'rotate-180 transition-all group-hover:rotate-0'
                      )}
                    ></ChevronIcon>
                  </>
                )}
              </div>
              <div className='group-over:h-fit group absolute h-0 divide-y overflow-y-hidden bg-white transition-all group-hover:overflow-y-visible'>
                {(languages || [])
                  .filter((l) => l.language !== language)
                  .map((l) => (
                    <div
                      className={clsx('bg-white px-4 py-2')}
                      key={l?.language}
                      onClick={() => handleLanguageChange(l)}
                    >
                      {extendedLanguages
                        .find((lang) => lang.id === l.language)
                        .id.toUpperCase()}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Container>
      </header>
      <div
        className={clsx(
          menuOpen ? 'h-dvh py-12' : 'h-0 py-0',
          'absolute top-[81px] z-10 flex w-full max-w-[100dvw] flex-col items-start justify-start gap-4 overflow-hidden bg-white px-12 text-paragraph transition-all duration-500'
        )}
      >
        {data.menu.map((entry, i) => {
          return <NavLink key={i} menu={entry} />
        })}
      </div>
    </>
  )
}
