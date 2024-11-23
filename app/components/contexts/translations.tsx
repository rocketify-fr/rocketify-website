import { useRouteLoaderData } from '@remix-run/react'
import React, { createContext, useCallback, useContext, useMemo } from 'react'

import { sanitize } from '~/utils/string'

interface iTranslation {
  t: (key: string, variables?: object) => string
}

const TranslationsContext = createContext<iTranslation>(null)

export const TranslationsProvider = ({ children, language = 'fr' }) => {
  const { translations: rawTranslations } = useRouteLoaderData('root')
  const translations = useMemo(() => {
    const result = {}

    const namespaces = rawTranslations?.namespaces || []

    for (const namespace of namespaces) {
      const key = sanitize(namespace.namespace)
      result[key] = {}
      for (const item of namespace.translations) {
        const value = sanitize(item[language])
        result[key][item.key] = value
      }
    }

    console.log({ result })
    return result
  }, [rawTranslations, language])

  const t = useCallback(
    (key: string, variables: object = {}): string | string[] => {
      let value: string
      for (const segment of key.split('.')) {
        if (translations[segment]) {
          value = translations[segment]
        } else {
          // console.warn(`${key} not found in translations ${language}`)
          return `missing ${key} for ${language}`
        }
      }
      // bad hack
      if (Array.isArray(value)) {
        return value
      }
      for (const [k, v] of Object.entries(variables)) {
        value = value.replace(new RegExp(`{${k}}`, 'g'), v)
      }
      return value
    },
    [language, translations]
  )

  const value: iTranslation = { t }

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  )
}

export const useTranslations = () => useContext(TranslationsContext)
