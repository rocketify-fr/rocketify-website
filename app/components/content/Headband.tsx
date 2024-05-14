import { Link as RemixLink } from '@remix-run/react'
import clsx from 'clsx'

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
    'headband flex size-full items-center justify-evenly gap-8 text-nowrap pl-16 text-2xl'
  )

  return (
    <div
      className={clsx(
        `bg-${color}`,
        margin && 'my-12 sm:my-32',
        'flex h-[80px] w-dvw cursor-pointer border-y border-black'
      )}
    >
      {title && to ? (
        <RemixLink to={to} title={title} className={classNames}>
          {new Array(50).fill(0).map((_, i) => (
            <>
              <Rockets color={rocketColor}></Rockets>
              <div className='flex items-center text-2xl'>{title}</div>
            </>
          ))}
        </RemixLink>
      ) : (
        <Link link={link} className={classNames}>
          {new Array(50).fill(0).map((_, i) => (
            <>
              <Rockets color={rocketColor}></Rockets>
              <div className='flex items-center text-2xl'>{title}</div>
            </>
          ))}
        </Link>
      )}
    </div>
  )
}

export default Headband
