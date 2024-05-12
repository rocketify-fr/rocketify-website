import {
  Contact,
  Disc,
  File,
  FileBarChart,
  FileCheck,
  FileStack,
  Home,
  MenuIcon,
  Newspaper,
  NotebookText,
  PanelBottom,
  PanelTop,
  PanelTopDashed,
  SettingsIcon,
  StickyNote,
  Tags,
  Users,
} from 'lucide-react'
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure'

import OGPreview from '~/sanity/components/OGPreview'
import { resolveOGUrl } from '~/sanity/structure/resolveOGUrl'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Document lists
      S.documentTypeListItem('page').title('Pages').icon(FileCheck),
      S.documentTypeListItem('service').title('Services').icon(FileBarChart),
      S.divider(),
      S.documentTypeListItem('post').title('Posts').icon(Newspaper),
      S.documentTypeListItem('useCase').title('Use cases').icon(NotebookText),

      S.divider(),
      S.documentTypeListItem('heroSection').title('Hero').icon(PanelTopDashed),
      S.documentTypeListItem('testimonial').title('Testimonial').icon(Contact),
      S.documentTypeListItem('navigation').title('Navigation').icon(MenuIcon),
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
