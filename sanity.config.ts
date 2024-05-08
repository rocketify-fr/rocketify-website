import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'

import { STUDIO_BASEPATH } from '~/sanity/constants'
import { locate } from '~/sanity/presentation/locate'
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
    structureTool({ structure, defaultDocumentNode }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/resource/preview',
        },
      },
      locate,
    }),
    visionTool(),
  ],
  basePath: STUDIO_BASEPATH,
  schema: {
    types: schema,
  },
})
