export const getLanguage = (params) => {
  const { lang: language } = params
  if (!language) {
    return 'fr'
  }
  return language
}
