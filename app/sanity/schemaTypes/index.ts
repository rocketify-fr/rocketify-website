import { customSchemaTypes } from '../customSchemaTypes' // customSchemaTypessche
import { documents } from '../documents' // documents
import { objects } from '../objects' // objects
import { authorType } from '../schemaTypes/authorType'
import { pageType } from '../schemaTypes/pageType'
import { postTagType } from '../schemaTypes/postTagType'
import { postType } from '../schemaTypes/postType'
import { useCaseTagType } from '../schemaTypes/useCaseTagType'
import { useCaseType } from '../schemaTypes/useCaseType'
import { sections } from '../sections' // sections
import { singletons } from '../singletons'
import { appType } from './appType'
import { serviceType } from './serviceType'

export default [
  postType,
  pageType,
  useCaseType,
  authorType,
  postTagType,
  useCaseTagType,
  appType,
  serviceType,
  ...objects,
  ...documents,
  ...customSchemaTypes,
  ...singletons,
  ...sections,
]
