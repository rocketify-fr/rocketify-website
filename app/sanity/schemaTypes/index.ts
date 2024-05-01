import {customImage} from '~/sanity/customSchemaTypes/customImage'
import {seo} from '~/sanity/customSchemaTypes/seo'
import {artistType} from '~/sanity/schemaTypes/artistType'
import {authorType} from '~/sanity/schemaTypes/authorType'
import {genreType} from '~/sanity/schemaTypes/genreType'
import {homeType} from '~/sanity/schemaTypes/homeType'
import {pageType} from '~/sanity/schemaTypes/pageType'
import {postTagType} from '~/sanity/schemaTypes/postTagType'
import {postType} from '~/sanity/schemaTypes/postType'
import {recordType} from '~/sanity/schemaTypes/recordType'
import {trackType} from '~/sanity/schemaTypes/trackType'
import {useCaseType} from '~/sanity/schemaTypes/useCaseType'

export default [
  artistType,
  genreType,
  homeType,
  recordType,
  trackType,
  postType,
  pageType,
  useCaseType,
  customImage,
  seo,
  authorType,
  postTagType,
]
