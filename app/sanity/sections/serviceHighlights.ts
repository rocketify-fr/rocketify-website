import { NotebookText } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const serviceHighlights = defineType({
  name: 'serviceHighlights',
  title: 'Service highlights',
  type: 'object',
  icon: NotebookText,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'services',
      type: 'array',
      of: [{ type: 'serviceCard' }],
    }),
  ],
})
