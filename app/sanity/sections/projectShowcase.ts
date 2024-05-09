import { NotebookText } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const projectShowcase = defineType({
  name: 'projectShowcase',
  title: 'Project showcase',
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
      name: 'projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'useCase' }] }],
    }),
  ],
})
