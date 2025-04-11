import { createClient } from '@sanity/client'

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET
const apiVersion = process.env.VITE_SANITY_API_VERSION

export const viewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
})
