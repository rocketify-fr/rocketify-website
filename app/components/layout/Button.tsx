import clsx from 'clsx'

export default function Button({ children, className = null, ...props }) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-3xl border border-black px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
