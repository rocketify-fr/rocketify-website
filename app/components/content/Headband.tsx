import clsx from 'clsx'
import Marquee from 'react-fast-marquee'

import RocketIcon from '../icons/Rocket'
import { Link } from '../Link'

const Rockets = ({ color }) => (
  <div className={'flex space-x-4'}>
    {new Array(3).fill(0).map((_, i) => (
      <RocketIcon width={52} height={21} color={color} />
    ))}
  </div>
)

const Headband = ({
  link,
  title = 'Démarrer un projet',
  colorName = 'rPurple',
  rocketColor,
}) => {
  const colors = ['rPurple', 'rTurquoise']
  const color = colors.find((c) => colorName.includes(c))
  return (
    <Link
      link={link}
      className={clsx(
        `bg-${color}`,
        'my-32 flex h-[80px] w-full items-center justify-evenly space-x-8 overflow-x-hidden border-y border-black'
      )}
    >
      <Rockets color={rocketColor}></Rockets>
      <div className='flex items-center text-2xl'>{title}</div>
      <Rockets color={rocketColor}></Rockets>
      <div className='flex items-center text-2xl'>{title}</div>
    </Link>
  )
}

export default Headband
