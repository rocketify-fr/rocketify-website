import {
  AppWindow,
  Contact,
  FileBarChart,
  FileCheck,
  MenuIcon,
  Newspaper,
  NotebookText,
  PanelBottom,
  PanelTop,
  PanelTopDashed,
  SettingsIcon,
} from 'lucide-react'
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure'

import OGPreview from '../components/OGPreview'
import { resolveOGUrl } from '../structure/resolveOGUrl'

export const languages = [
  { id: 'fr', title: 'Français', flag: '🇫🇷' },
  { id: 'en', title: 'English', flag: '🇬🇧' },
].map((language) => ({
  ...language,
  camelId: language.id[0].toUpperCase() + language.id.slice(1),
}))

const getLocalizedTitle = (title: string, lang: (typeof languages)[0]) => {
  return `${lang.flag} ${title} ${lang.title}`
}

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Document lists
      S.listItem()
        .title('Pages')
        .icon(FileCheck)
        .child(
          S.list()
            .title('Pages par langue')
            .items(
              languages.map((language) =>
                S.listItem()
                  .title(getLocalizedTitle('Pages', language))
                  .icon(NotebookText)
                  .child(
                    S.documentList()
                      .title(getLocalizedTitle('Pages', language))
                      .filter('_type == "page" && language == $language')
                      .params({ language: language.id })
                  )
              )
            )
        ),
      S.listItem()
        .title('Services')
        .icon(FileBarChart)
        .child(
          S.list()
            .title('Services par langue')
            .items(
              languages.map((language) =>
                S.listItem()
                  .title(getLocalizedTitle('Services', language))
                  .icon(NotebookText)
                  .child(
                    S.documentList()
                      .title(getLocalizedTitle('Services', language))
                      .filter('_type == "service" && language == $language')
                      .params({ language: language.id })
                  )
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title('Posts')
        .icon(Newspaper)
        .child(
          S.list()
            .title('Posts par langue')
            .items(
              languages.map((language) =>
                S.listItem()
                  .title(getLocalizedTitle('Posts', language))

                  .icon(NotebookText)
                  .child(
                    S.documentList()
                      .title(getLocalizedTitle('Posts', language))
                      .filter('_type == "post" && language == $language')
                      .params({ language: language.id })
                  )
              )
            )
        ),
      S.listItem()
        .title('Use cases')
        .icon(NotebookText)
        .child(
          S.list()
            .title('Use cases par langue')
            .items(
              languages.map((language) =>
                S.listItem()
                  .title(getLocalizedTitle('Use cases', language))
                  .icon(NotebookText)
                  .child(
                    S.documentList()
                      .title(getLocalizedTitle('Use cases', language))
                      .filter('_type == "useCase" && language == $language')
                      .params({ language: language.id })
                  )
              )
            )
        ),
      S.listItem()
        .title('Apps')
        .icon(AppWindow)
        .child(
          S.list()
            .title('Apps par langue')
            .items(
              languages.map((language) =>
                S.listItem()
                  .title(getLocalizedTitle('Apps', language))
                  .icon(AppWindow)
                  .child(
                    S.documentList()
                      .title(getLocalizedTitle('App', language))
                      .filter('_type == "app" && language == $language')
                      .params({ language: language.id })
                  )
              )
            )
        ),
      S.divider(),
      S.documentTypeListItem('heroSection').title('Hero').icon(PanelTopDashed),
      S.documentTypeListItem('testimonial').title('Testimonial').icon(Contact),
      S.documentTypeListItem('nav').title('Navigation').icon(MenuIcon),
      S.divider(),
      S.listItem()
        .title('Settings')
        .id('settings')
        .icon(SettingsIcon)
        .child(
          S.list()
            .title('Site Settings')
            .items(
              languages.flatMap((lang) => [
                S.listItem()
                  .title(getLocalizedTitle('Header Settings', lang))
                  .icon(PanelTop)
                  .child(
                    S.editor()
                      .id(`header${lang.camelId}`)
                      .schemaType(`header${lang.camelId}`)
                      .documentId(`header${lang.camelId}`)
                  ),
                S.listItem()
                  .title(getLocalizedTitle('Footer Settings', lang))
                  .icon(PanelBottom)
                  .child(
                    S.editor()
                      .id(`footer${lang.camelId}`)
                      .schemaType(`footer${lang.camelId}`)
                      .documentId(`footer${lang.camelId}`)
                  ),
              ])
            )
        ),
      S.divider(),
      S.listItem()
        .title('Translations')
        .id('translations')
        .icon(SettingsIcon)
        .child(
          S.list()
            .title('Translations')
            .items([
              S.listItem()
                .title('Translations')
                .child(
                  S.editor()
                    .id(`translations`)
                    .schemaType(`translations`)
                    .documentId(`translations`)
                ),
            ])
        ),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, documentId }
) => {
  const OGPreviewView = S.view
    .component(OGPreview)
    .options({
      url: resolveOGUrl(documentId),
    })
    .title('OG Preview')

  switch (schemaType) {
    case 'home':
      return S.document().views([S.view.form()])
    case 'record':
    case 'post':
    case 'useCase':
      return S.document().views([S.view.form(), OGPreviewView])
    default:
      return S.document().views([S.view.form()])
  }
}
