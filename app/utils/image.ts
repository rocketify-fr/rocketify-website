import urlBuilder from '@sanity/image-url'

import { dataset, projectId } from '~/sanity/projectDetails'

const builder = urlBuilder({ projectId, dataset })

export function urlFor(source) {
  return builder.image(source)
}
