import {
  Disc,
  Home,
  Newspaper,
  NotebookText,
  StickyNote,
  Tags,
  Users,
} from 'lucide-react'
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/structure'

import OGPreview from '~/sanity/components/OGPreview'
import {resolveOGUrl} from '~/sanity/structure/resolveOGUrl'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Singleton, home page curation
      S.listItem()
        .icon(Home)
        .id('home')
        .schemaType('home')
        .title('Home')
        .child(S.editor().id('home').schemaType('home').documentId('home')),
      S.divider(),
      // Document lists
      S.documentTypeListItem('record').title('Records').icon(Disc),
      S.documentTypeListItem('artist').title('Artists').icon(Users),
      S.divider(),
      S.documentTypeListItem('genre').title('Genres').icon(Tags),
      S.divider(),
      S.documentTypeListItem('post').title('Posts').icon(Newspaper),
      S.documentTypeListItem('useCase').title('Use cases').icon(NotebookText),
      S.divider(),
      S.documentTypeListItem('page').title('Pages').icon(StickyNote),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType, documentId},
) => {
  const OGPreviewView = S.view
    .component(OGPreview)
    .options({
      url: resolveOGUrl(documentId),
    })
    .title('OG Preview')

  switch (schemaType) {
    case `home`:
      return S.document().views([S.view.form()])
    case `record`:
    case `post`:
    case `useCase`:
      return S.document().views([S.view.form(), OGPreviewView])
    default:
      return S.document().views([S.view.form()])
  }
}
