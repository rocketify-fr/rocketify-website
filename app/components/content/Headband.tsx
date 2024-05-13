import { Link as RemixLink } from '@remix-run/react'
import clsx from 'clsx'
import Marquee from 'react-fast-marquee'

import RocketIcon from '../icons/Rocket'
import { Link } from '../Link'

const Rockets = ({ color }) => (
  <div className={'flex gap-4'}>
    {new Array(3).fill(0).map((_, i) => (
      <RocketIcon width={52} height={21} color={color} />
    ))}
  </div>
)

const Headband = ({
  link = null,
  colorName = 'rPurple',
  rocketColor = null,
  margin = true,
  title = null,
  to = null,
}) => {
  const colors = ['rPurple', 'rTurquoise', 'rGreen']
  const color = colors.find((c) => colorName.includes(c))
  const classNames = clsx(
    `bg-${color}`,
    margin && 'my-32',
    'headband w-vw flex h-[80px] items-center justify-evenly gap-8 overflow-x-scroll text-nowrap border-y border-black pl-16 text-2xl'
  )
  return title && to ? (
    <RemixLink to={to} title={title} className={classNames}>
      <Rockets color={rocketColor}></Rockets>
      <div className='flex items-center '>{title}</div>
      <Rockets color={rocketColor}></Rockets>
      <div className='flex items-center text-2xl'>{title}</div>
    </RemixLink>
  ) : (
    <Link link={link} className={classNames}>
      <Rockets color={rocketColor}></Rockets>
      <div className='flex items-center '>{title}</div>
      <Rockets color={rocketColor}></Rockets>
      <div className='flex items-center text-2xl'>{title}</div>
    </Link>
  )
}

export default Headband
