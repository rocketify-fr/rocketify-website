import { useMatches } from '@remix-run/react'
import clsx from 'clsx'
import { useEffect } from 'react'

import { getLanguage } from '~/utils/language'

import { useTranslations } from './contexts/translations'

export default function Container({ children, className = null }) {
  return (
    <div className={clsx('container mx-auto px-4 lg:px-12', className)}>
      {children}
    </div>
  )
}

export const Page = ({ children }) => {
  const { setLanguage, setLanguages } = useTranslations()
  const matches = useMatches()
  const { data, params } = matches[matches.length - 1]

  useEffect(() => {
    const translations =
      data?.initial?.data?.translations || data?.pageData?.translations

    const language = getLanguage(params)

    if (translations) {
      setLanguages(translations)
    }
    if (language) {
      setLanguage(language)
    }
  }, [data, params, setLanguage, setLanguages])

  return <div className='pb-32 pt-8'>{children}</div>
}
