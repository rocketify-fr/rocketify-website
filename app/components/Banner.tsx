import clsx from 'clsx'
import Marquee from 'react-fast-marquee'

const Rockets = () => (
  <div className={'flex space-x-4'}>
    {new Array(3).fill(0).map((_, i) => (
      <img
        src='/img/rocket.svg'
        alt='Rocketify rocket'
        height={21}
        width={52}
      />
    ))}
  </div>
)

export default function Banner({
  text = 'Démarrer un projet',
  color = 'rPurple'
}) {
  return (
    <div
      className={clsx(
        'bg-rPurple',
        'align-center flex h-[80px] w-full justify-evenly space-x-8 overflow-x-scroll border-y border-black '
      )}
    >
      <Rockets></Rockets>
      <div className='flex items-center text-2xl'>{text.replace(' ', '&nbsp;')}</div>
      <Rockets></Rockets>
      <div className='flex items-center text-2xl'>{text.replace(' ', '&nbsp;')}</div>
    </div>
  )
}
