import { NotebookText } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const methodology = defineType({
  name: 'methodology',
  title: 'Methodology',
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
      name: 'image',
      type: 'customImage',
    }),
    defineField({
      name: 'summary',
      type: 'array',
      of: [{ type: 'summaryItem' }],
    }),
  ],
})
