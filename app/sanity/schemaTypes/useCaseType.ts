import {NotebookText} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const useCaseType = defineType({
  name: 'useCase',
  title: 'Use case',
  type: 'document',
  icon: NotebookText,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
  ],
})
