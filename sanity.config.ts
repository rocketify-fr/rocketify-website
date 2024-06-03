import { assist } from '@sanity/assist'
import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { defineLocations, presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'

import { STUDIO_BASEPATH } from '~/sanity/constants'
import { projectDetails } from '~/sanity/projectDetails'
import schema from '~/sanity/schemaTypes'
import { defaultDocumentNode, structure } from '~/sanity/structure'

export default defineConfig({
  ...projectDetails(),
  name: 'sanity-remix',
  title: 'Sanity Remix',
  plugins: [
    codeInput(),
    media(),
    assist(),
    structureTool({ structure, defaultDocumentNode }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/resource/preview',
        },
      },
      resolve: {
        locations: {
          record: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/services/${doc?.slug}`,
                },
                { title: 'Home', href: `/` },
              ],
            }),
          }),
        },
      },
    }),
    visionTool(),
    unsplashImageAsset(),
  ],
  basePath: STUDIO_BASEPATH,
  schema: {
    types: schema,
  },
})
