import { defineArrayMember, defineField, defineType } from 'sanity'

import { languages } from '../structure'

export const translations = defineType({
  name: 'translations',
  title: 'Translations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      readOnly: true,
      hidden: true,
      initialValue: 'Translations',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'item',
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
        }),
      ],
    }),
    // defineField({
    //   name: 'language',
    //   type: 'string',
    //   readOnly: true,
    //   hidden: true,
    //   initialValue: 'fr',
    // }),
    // defineField({
    //   name: 'logo',
    //   type: 'customImage',
    // }),
    // defineField({
    //   name: 'menuHeader',
    //   type: 'reference',
    //   to: [{ type: 'nav' }],
    // }),
  ],
})
