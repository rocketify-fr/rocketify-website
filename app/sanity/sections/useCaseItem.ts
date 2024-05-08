import {NotebookText} from 'lucide-react'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const useCaseItem = defineType({
  name: 'useCaseItem',
  title: 'Use case item',
  type: 'object',
  icon: NotebookText,
  fields: [
    defineField({
      name: 'image',
      type: 'customImage',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
})
