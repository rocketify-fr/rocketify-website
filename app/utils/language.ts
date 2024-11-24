import { languages as extLangugages } from '../sanity/structure/index.ts'

export const languages = extLangugages.map((lng) => lng.id)

export const extendedLanguages = extLangugages

// used in loaders when we have context params
export const getLanguage = (params) => {
  const { lang: language } = params

  if (!language) {
    return 'fr'
  }

  if (!languages.includes(language)) {
    return 'fr'
  }

  return language
}

// used in components to detect language from location.pathname
// export const getPathLanguage = (path: string) => {
//   const parts = path.split('/')
//
//   for (const l of languages) {
//     if (parts[0] === l) {
//       return l
//     }
//   }
//
//   return 'fr'
// }

// used for links, to append non default language if needed
export const getLocalizedPath = (lang: string, path: string) => {
  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  if (lang === 'fr') {
    return path
  }
  return `/${lang}${path}`
}
