import clsx from 'clsx'

export default function Container({ children, className = null }) {
  return (
    <div className={clsx('container mx-auto px-4 lg:px-12', className)}>
      {children}
    </div>
  )
}

export const Page = ({ children }) => {
  return <div className='pb-32 pt-8'>{children}</div>
}
