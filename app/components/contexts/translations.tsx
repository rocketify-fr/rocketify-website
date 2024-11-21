import { useRouteLoaderData } from '@remix-run/react'
import { Text } from '@shopify/polaris'
import React, { createContext, useCallback, useContext, useMemo } from 'react'

interface iTranslation {
  t: (key: string, variables?: object) => string
}

const TranslationsContext = createContext<iTranslation>(null)

export const TranslationsProvider = ({ children, language = 'fr' }) => {
  const { translations: rawTranslations } = useRouteLoaderData('root')
  const translations = useMemo(() => {
    const result = {}

    const items = rawTranslations?.items

    for (const item of items) {
      result[item.key] = item[language]
    }

    return result
  }, [rawTranslations, language])

  const t = useCallback(
    (key: string, variables: object = {}): string => {
      let value = translations[key]
      if (!value) {
        // console.warn(`${key} not found in translations ${language}`)
        return `missing ${key} for ${language}`
      }
      // bad hack
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
