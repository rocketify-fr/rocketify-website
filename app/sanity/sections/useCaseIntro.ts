import {NotebookText} from 'lucide-react'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const useCaseIntro = defineType({
  name: 'useCaseIntro',
  title: 'Use case intro',
  type: 'object',
  icon: NotebookText,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'image',
      type: 'customImage',
    }),
    defineField({
      name: 'summary',
      type: 'array',
      of: [{type: 'summaryItem'}],
    }),
  ],
})
