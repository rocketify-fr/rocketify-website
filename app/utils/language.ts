import { languages as extLangugages } from '../sanity/structure/index.ts'

export const languages = extLangugages.map((lng) => lng.id)

export const extendedLanguages = extLangugages

export const getLanguage = (params) => {
  const { lang: language } = params

  if (!language) {
    return 'fr'
  }

  return language
}

export const getLocalizedPath = (lang: string, path: string) => {
  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  if (lang === 'fr') {
    return path
  }
  return `/${lang}${path}`
}
