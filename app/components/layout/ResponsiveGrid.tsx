import clsx from 'clsx'
import React from 'react'

type ResponsiveGridProps = {
  children: React.ReactNode
  className?: string
  gaps?: Number
  gapsX?: Number
  gapsY?: Number
}

export default function ResponsiveGrid({
  children,
  className = null,
  gaps = 4,
  gapsX,
  gapsY
}: ResponsiveGridProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3',
        gaps ? `gap-${gaps}` : 'gap-4',
        gapsY && `gap-y-${gapsY}`,
        gapsX && `gap-x-${gapsX}`,
        className
      )}
    >
      {children}
    </div>
  )
}

export const Page = ({ children }) => {
  return <div className='pb-32 pt-8'>{children}</div>
}
