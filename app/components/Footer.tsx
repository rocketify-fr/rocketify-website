import { PortableText } from '@portabletext/react'
import clsx from 'clsx'

import Container from './Container'
import Headband from './content/Headband'
import { useTranslations } from './contexts/translations'
import { Link } from './Link'

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
  } = data
  const { t } = useTranslations()
  return (
    <footer className='flex flex-col border-t border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900'>
      <Headband
        margin={false}
        to='/contact'
        title={t('project.start')}
      ></Headband>
      <Container className='flex flex-col items-start justify-between gap-8 pt-12 sm:flex-row'>
        <div className='flex flex-1 flex-col gap-4'>
          <img src={logo.url} alt={logo.alt} width={140} />
          <p className='text-md'>{description}</p>
        </div>
        <div className='flex flex-1 flex-col gap-8 sm:flex-row'>
          <div className='flex flex-1 flex-col sm:items-center'>
            <div className='flex flex-col gap-4'>
              <p className='font-bai text-xl'>{menuTitle}</p>
              {menu.map((link, i) => (
                <Link
                  key={i}
                  className={clsx(
                    i + 1 === menu.length &&
                      'flex justify-center self-start rounded-3xl border border-black bg-rGreen px-4 py-1',
                    'text-md'
                  )}
                  link={link}
                >
                  {link[link.linkType].title}
                </Link>
              ))}
            </div>
          </div>
          <div className='flex flex-1 flex-col gap-4 text-md sm:items-end'>
            <p className='font-bai text-xl'>{contactTitle}</p>
            {contactMenu.map((text, i) => {
              return <PortableText key={i} value={text}></PortableText>
            })}
          </div>
        </div>
      </Container>
      <Container className='flex flex-col justify-start gap-4 pt-8'>
        <p className='py-2 font-bai text-xl'>{certificationsTitle}</p>
        <div className='grid grid-cols-1 justify-evenly gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {certifications.map((cert) => (
            <div
              key={cert.description}
              className='flex flex-1 flex-col items-start justify-start rounded-xl border border-black p-4 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-6'
            >
              <img
                src={cert.logo.url}
                width={64}
                height={64}
                className='size-[40px] sm:size-[64px]'
                alt='Certification'
              />
              <div className='flex flex-col gap-2 sm:items-end sm:text-right'>
                <p className='font-bai text-paragraph font-bold uppercase'>
                  {cert.title}
                </p>
                <p className='font-work text-sm'>{cert.description}</p>
                <p className='font-work text-xs'>{cert.issueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Container className='mt-12 flex flex-col gap-8 pb-12 pt-4'>
        <div className='w-full border-t border-t-black'></div>
        <div className='flex justify-between'>
          {menuSubFooter.menu.map((link) => (
            <Link
              key={link[link.linkType].title}
              className='font-work text-xs underline'
              link={link}
            >
              {link[link.linkType].title}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  )
}
