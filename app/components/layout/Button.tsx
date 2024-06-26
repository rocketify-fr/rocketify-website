import clsx from 'clsx'

export default function Button({
  children,
  disabled = false,
  className = null,
  onClick = null,
  ...props
}) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-3xl border border-black px-4 py-2',
        disabled
          ? 'pointer-events-none cursor-not-allowed bg-gray-100'
          : 'cursor-pointer',
        className
      )}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {children}
    </div>
  )
}
