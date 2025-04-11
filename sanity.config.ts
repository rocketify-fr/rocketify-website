import { assist } from '@sanity/assist'
import { codeInput } from '@sanity/code-input'
import { documentInternationalization } from '@sanity/document-internationalization'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { defineLocations, presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { media } from 'sanity-plugin-media'

// import { STUDIO_BASEPATH } from '~/sanity/constants'
import schema from './app/sanity/schemaTypes'
import { defaultDocumentNode, structure } from './app/sanity/structure'

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET
const apiVersion = process.env.VITE_SANITY_API_VERSION

console.log({projectId, dataset, apiVersion})

export default defineConfig({
  projectId,
  dataset,
  apiVersion,
  name: 'rocketify-web',
  title: 'Rocketify Web',
  plugins: [
    documentInternationalization({
      // ...or a function that takes the client and returns a promise of an array of supported languages
      supportedLanguages: [
        { id: 'fr', title: 'French' },
        { id: 'en', title: 'English' },
      ],
      // Translations UI will only appear on these schema types
      schemaTypes: [
        'author',
        'post',
        'postTag',
        'useCase',
        'useCaseTag',
        'page',
        'service',
        'app',
      ],
      // Optional
      // Customizes the name of the language field
      languageField: `language`, // defauts to "language"
      // Optional
      // Keep translation.metadata references weak
      weakReferences: true, // defaults to false
    }),
    internationalizedArray({
      languages: [
        { id: 'fr', title: 'French' },
        { id: 'en', title: 'English' },
      ],
      defaultLanguages: ['fr'],
      fieldTypes: ['string', 'text'],
    }),
    codeInput(),
    media(),
    assist({
      translate: {
        document: {
          languageField: 'language',
        },
      },
    }),
    structureTool({ structure, defaultDocumentNode }),
    // presentationTool({
    //   previewUrl: {
    //     previewMode: {
    //       enable: '/resource/preview',
    //     },
    //   },
    //   resolve: {
    //     locations: {
    //       record: defineLocations({
    //         select: {
    //           title: 'title',
    //           slug: 'slug.current',
    //         },
    //         resolve: (doc) => ({
    //           locations: [
    //             {
    //               title: doc?.title || 'Untitled',
    //               href: `/services/${doc?.slug}`,
    //             },
    //             { title: 'Home', href: `/` },
    //           ],
    //         }),
    //       }),
    //     },
    //   },
    // }),
    // visionTool(),
    unsplashImageAsset(),
  ],
  schema: {
    types: schema,
  },
})
