import { useLoaderData, useRouteLoaderData } from '@remix-run/react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { sanitize } from '~/utils/string'

const TranslationsContext = createContext(null)

export const TranslationsProvider = ({ children }) => {
  const { translations: rawTranslations, language: initialLanguage } =
    useRouteLoaderData('root')

  const [languages, _setLanguages] = useState([])
  const [language, setLanguage] = useState(initialLanguage)

  const setLanguages = useCallback(
    (langs) => {
      const current = langs.find((l) => l.language === language)
      const value = [
        current,
        ...langs.filter((l) => l.language !== language),
      ].filter((l) => !!l)

      _setLanguages(value)
    },
    [language]
  )

  const translations = useMemo(() => {
    const result = {}

    const namespaces = rawTranslations?.namespaces || []

    for (const namespace of namespaces) {
      const key = sanitize(namespace.namespace)
      for (const item of namespace.translations) {
        const value = sanitize(item[language])
        result[`${key}.${item.key}`] = value
      }
    }

    return result
  }, [rawTranslations, language])

  const t = useCallback(
    (key: string, variables: object = {}): string => {
      let value: string
      if (translations[key]) {
        value = translations[key]
      } else {
        return `missing ${key} for ${language}`
      }
      for (const [k, v] of Object.entries(variables)) {
        value = value.replace(new RegExp(`{${k}}`, 'g'), v)
      }

      return value
    },
    [language, translations]
  )

  const value = {
    t,
    languages,
    setLanguages,
    language,
    setLanguage,
  }

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  )
}

export const useTranslations = () => useContext(TranslationsContext)
