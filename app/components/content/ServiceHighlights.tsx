import clsx from 'clsx'

import { getRandomColor } from '~/utils/colors'

import Container from '../Container'
import ResponsiveGrid from '../layout/ResponsiveGrid'
import { Link } from '../Link'
import { Slider } from '../Slider'

const ServiceHighlights = ({ title, description, services }) => {
  return (
    <>
      <Container className='flex flex-col gap-4 pb-16'>
        <h2 className='text-2xl sm:text-blockHeader'>{title}</h2>
        <p className='pb-8 text-paragraph lg:w-2/3'>{description}</p>
      </Container>
      <div className='w-dvw overflow-x-hidden px-4 sm:hidden'>
        <Slider effect='cards' name='sevices'>
          {services.map(({ title, description, icon, link }, i) => {
            return (
              <Link
                link={link}
                key={i}
                className='relative flex max-w-[350px] flex-col gap-4 overflow-hidden rounded-3xl border border-black bg-white p-6'
              >
                <img src={icon.url} alt={icon.url} height={40} width={40} />
                <h3 className='text-[26px]'>{title}</h3>
                <p className='text-paragraph'>{description}</p>
              </Link>
            )
          })}
        </Slider>
      </div>
      <Container>
        <ResponsiveGrid className='hidden sm:grid' gaps={8}>
          {services.map(({ title, description, icon, link }, i) => {
            return (
              <div className='relative' key={i}>
                <Link
                  link={link}
                  className='relative z-10 flex size-full flex-col gap-4 rounded-3xl border border-black bg-white p-6 transition-transform duration-500 hover:-translate-y-2 hover:translate-x-2'
                >
                  <img src={icon.url} alt={icon.url} height={40} width={40} />
                  <h3 className='text-[26px]'>{title}</h3>
                  <p className='text-paragraph'>{description}</p>
                </Link>
                <div
                  className={clsx(
                    'absolute left-0 top-0 z-0 size-full rounded-3xl',
                    `bg-${getRandomColor()}`
                  )}
                ></div>
              </div>
            )
          })}
        </ResponsiveGrid>
      </Container>
    </>
  )
}

export default ServiceHighlights
