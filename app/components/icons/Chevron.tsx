import clsx from 'clsx'

const ChevronIcon = ({
  color = 'black',
  width = 13,
  height = 8,
  className = null,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      className={clsx(`fill-${color}`, className)}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.30494 0.602219C6.52461 0.382543 6.88072 0.382544 7.10039 0.602219L12.8352 6.33709C13.0549 6.55677 13.0549 6.91287 12.8352 7.13254L12.5701 7.39774C12.3504 7.61742 11.9943 7.61742 11.7746 7.39774L6.70266 2.32579L1.63071 7.39774C1.41104 7.61742 1.05494 7.61742 0.835264 7.39774L0.570065 7.13254C0.35039 6.91287 0.35039 6.55677 0.570065 6.33709L6.30494 0.602219Z'
      />
    </svg>
  )
}

export default ChevronIcon
