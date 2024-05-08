import {customSchemaTypes} from '~/sanity/customSchemaTypes' // customSchemaTypes
import {documents} from '~/sanity/documents' // documents
import {objects} from '~/sanity/objects' // objects
import {artistType} from '~/sanity/schemaTypes/artistType'
import {authorType} from '~/sanity/schemaTypes/authorType'
import {genreType} from '~/sanity/schemaTypes/genreType'
import {homeType} from '~/sanity/schemaTypes/homeType'
import {pageType} from '~/sanity/schemaTypes/pageType'
import {postTagType} from '~/sanity/schemaTypes/postTagType'
import {postType} from '~/sanity/schemaTypes/postType'
import {recordType} from '~/sanity/schemaTypes/recordType'
import {trackType} from '~/sanity/schemaTypes/trackType'
import {useCaseTagType} from '~/sanity/schemaTypes/useCaseTagType'
import {useCaseType} from '~/sanity/schemaTypes/useCaseType'
import {sections} from '~/sanity/sections' // sections
import {singletons} from '~/sanity/singletons'

export default [
  artistType,
  genreType,
  homeType,
  recordType,
  trackType,
  postType,
  pageType,
  useCaseType,
  authorType,
  postTagType,
  useCaseTagType,
  ...objects,
  ...documents,
  ...customSchemaTypes,
  ...singletons,
  ...sections,
]
