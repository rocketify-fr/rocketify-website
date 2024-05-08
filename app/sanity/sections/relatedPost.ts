import {NotebookText} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const relatedPost = defineType({
  name: 'relatedPost',
  title: 'Related post',
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
      name: 'cta',
      type: 'ctaButton',
    }),
    defineField({
      name: 'relatedPosts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}, {type: 'useCase'}]}],
    }),
  ],
})
