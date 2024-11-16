export const languages = ['fr', 'en']

export const getLanguage = (params) => {
  const { lang: language } = params

  if (!language) {
    return 'fr'
  }

  return language
}

export const getLocalizedPath = (lang, path) => {
  console.log({ lang, path })
  if (lang === 'fr') {
    return path
  }
  return `/${lang}${path}`
}

export const getLocalizedSlug = (params) => {
  const language = getLanguage(params)
  const { slug } = params

  console.log({ language, slug })

  if (language === 'fr') {
    return slug
  }

  return `${language}/${slug}`
}
