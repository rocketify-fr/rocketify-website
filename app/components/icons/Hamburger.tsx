import clsx from 'clsx'

const HamburgerIcon = ({ className = null, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={clsx(className)}
      width='32'
      height='26'
      viewBox='0 0 32 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect y='0.5' width='32' height='3' rx='1.5' fill='#222A2B' />
      <path
        d='M0 13C0 12.1716 0.671573 11.5 1.5 11.5H30.5C31.3284 11.5 32 12.1716 32 13C32 13.8284 31.3284 14.5 30.5 14.5H1.5C0.671573 14.5 0 13.8284 0 13Z'
        fill='#222A2B'
      />
      <rect y='22.5' width='32' height='3' rx='1.5' fill='#222A2B' />
    </svg>
  )
}

export default HamburgerIcon
