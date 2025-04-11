import { Tags } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import { isUniqueOtherThanLanguage } from '../../utils/slug'

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
        isUnique: isUniqueOtherThanLanguage,
      },
    }),
  ],
})
