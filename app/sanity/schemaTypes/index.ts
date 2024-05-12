import { customSchemaTypes } from '~/sanity/customSchemaTypes' // customSchemaTypes
import { documents } from '~/sanity/documents' // documents
import { objects } from '~/sanity/objects' // objects
import { authorType } from '~/sanity/schemaTypes/authorType'
import { pageType } from '~/sanity/schemaTypes/pageType'
import { postTagType } from '~/sanity/schemaTypes/postTagType'
import { postType } from '~/sanity/schemaTypes/postType'
import { useCaseTagType } from '~/sanity/schemaTypes/useCaseTagType'
import { useCaseType } from '~/sanity/schemaTypes/useCaseType'
import { sections } from '~/sanity/sections' // sections
import { singletons } from '~/sanity/singletons'

import { serviceType } from './serviceType'

export default [
  postType,
  pageType,
  useCaseType,
  authorType,
  postTagType,
  useCaseTagType,
  serviceType,
  ...objects,
  ...documents,
  ...customSchemaTypes,
  ...singletons,
  ...sections,
]
