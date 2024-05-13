import { PortableText } from '@portabletext/react'
import clsx from 'clsx'

import { Logo } from '~/components/Logo'
import type { LogoProps } from '~/types/home'

import Banner from './Banner'
import { Link } from './Link'
import Container from './Container'
import Headband from './content/Headband'

export function Footer({ data }) {
  const {
    description,
    logo,
    menuTitle,
    contactTitle,
    contactMenu,
    menu,
    certificationsTitle,
    certifications,
    menuSubFooter,
    ...rest
  } = data
  return (
    <footer className='flex flex-col border-t border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900'>
      <Headband margin={false} to="/contact" title="Démarrer un projet" ></Headband>
      <Container className='flex items-start justify-between gap-12 pt-12'>
        <div className='flex flex-1 flex-col'>
          <Logo />
          <p className='text-md'>{description}</p>
        </div>
        <div className='flex flex-1'>
          <div className='flex flex-1 flex-col items-center'>
            <div className="flex gap-4 flex-col">
              <p className='font-bai text-xl'>{menuTitle}</p>
              {menu.map((link, i) => (
                <Link
                  className={clsx(
                    i + 1 === menu.length &&
                    'rounded-3xl border border-black bg-rGreen px-4 justify-center flex',
                    'text-md'
                  )}
                  link={link}
                >
                  {link[link.linkType].title}
                </Link>
              ))}
            </div>
          </div>
          <div className='flex flex-1 flex-col items-start space-y-2'>
            <p className='font-bai text-xl'>{contactTitle}</p>
            {contactMenu.map((text, i) => {
              return <PortableText value={text}></PortableText>
            })}
          </div>
        </div>
      </Container>
      <Container className='flex flex-col justify-start'>
        <p className='py-2 font-bai text-xl'>{certificationsTitle}</p>
        <div className='flex justify-evenly gap-8'>
          {certifications.map((cert) => (
            <div className='align-center flex flex-1 justify-between rounded-xl border border-black px-4 py-6'>
              <img
                src={cert.logo.url}
                width={64}
                height={64}
                className='size-[64px]'
                alt='Certification'
              />
              <div className='flex flex-col items-end text-right'>
                <p className='text-buttonLabelBody font-bai font-bold uppercase'>
                  {cert.title}
                </p>
                <p className='font-work text-sm'>{cert.description}</p>
                <p className='font-work text-xs'>{cert.issueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Container className='mt-12 flex justify-between border-t border-t-black pb-12 pt-4'>
        {menuSubFooter.menu.map((link) => (
          <Link className='font-work text-xs underline' link={link}>
            {link[link.linkType].title}
          </Link>
        ))}
      </Container>
    </footer>
  )
}
