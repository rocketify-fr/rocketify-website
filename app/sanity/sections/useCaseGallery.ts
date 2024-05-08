import {NotebookText} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const useCaseGallery = defineType({
  name: 'useCaseGallery',
  title: 'Use case gallery',
  type: 'object',
  icon: NotebookText,
  fields: [
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{type: 'customImage'}],
    }),
  ],
})
