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

const Headband = ({ link, title, colorName = 'rPurple', rocketColor }) => {
  const colors = ['rPurple', 'rTurquoise', 'rGreen']
  const color = colors.find((c) => colorName.includes(c))
  return (
    <Link
      link={link}
      className={clsx(
        `bg-${color}`,
        'headband w-vw my-32 flex h-[80px] items-center justify-evenly overflow-x-scroll text-nowrap border-y border-black text-2xl'
      )}
    >
      <Rockets color={rocketColor}></Rockets>
      <div className='flex items-center '>{title}</div>
      <Rockets color={rocketColor}></Rockets>
      <div className='flex items-center text-2xl'>{title}</div>
    </Link>
  )
}

export default Headband
