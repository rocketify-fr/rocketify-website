import { defineField, defineType } from 'sanity'

import { languages } from '../structure'

export const translationItem = defineType({
  name: 'translationItem',
  title: 'Translation item',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
    }),
    ...languages.map((language) =>
      defineField({
        name: language.id,
        type: 'string',
      })
    ),
  ],
})
