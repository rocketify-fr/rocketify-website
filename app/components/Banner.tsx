import clsx from 'clsx'

const Rockets = () => (
  <div className={'flex space-x-4'}>
    {new Array(3).fill(0).map((_, i) => (
      <img
        key={i}
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
  color = 'rPurple',
}) {
  return (
    <div
      className={clsx(
        'bg-rPurple',
        'flex h-[80px] w-full items-center justify-evenly space-x-8 overflow-x-scroll border-y border-black '
      )}
    >
      <Rockets></Rockets>
      <div className='flex items-center text-2xl'>
        {text.replace(' ', '&nbsp;')}
      </div>
      <Rockets></Rockets>
      <div className='flex items-center text-2xl'>
        {text.replace(' ', '&nbsp;')}
      </div>
    </div>
  )
}
