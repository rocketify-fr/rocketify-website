import type { LayoutProps } from '~/components/Layout'
import { Logo } from '~/components/Logo'
import { ThemeToggle } from '~/components/ThemeToggle'

export function Header(props: LayoutProps) {
  console.log(props)
  return (
    <header className="border-b border-black transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo home={props.home} />
        <div className="flex space-x-2 items-baseline">
          <div>
            menu1
            menu2
            menu3
          </div>
          <ThemeToggle theme={props.theme} />
        </div>
      </div>
    </header>
  )
}
