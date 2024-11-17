import {
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

import OGPreview from '~/sanity/components/OGPreview'
import { resolveOGUrl } from '~/sanity/structure/resolveOGUrl'

const languages = [
  { id: 'fr', title: 'Français', flag: '🇫🇷' },
  { id: 'en', title: 'English', flag: '🇬🇧' },
]

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
            .items([
              S.listItem()
                .title('Header Settings')
                .icon(PanelTop)
                .child(
                  S.editor()
                    .id('header')
                    .schemaType('header')
                    .documentId('header')
                ),
              S.listItem()
                .title('Footer Settings')
                .icon(PanelBottom)
                .child(
                  S.editor()
                    .id('footer')
                    .schemaType('footer')
                    .documentId('footer')
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
