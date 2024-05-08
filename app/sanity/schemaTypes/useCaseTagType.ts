import {Tags} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const useCaseTagType = defineType({
  name: 'useCaseTag',
  title: 'Use case Tag',
  type: 'document',
  icon: Tags,
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
