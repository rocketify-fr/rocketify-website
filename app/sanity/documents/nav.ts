import { defineField, defineType } from 'sanity'
export const nav = defineType({
  name: 'nav',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'menu',
      type: 'array',
      of: [
        { type: 'customLink' },
        { type: 'ctaButton' },
        { type: 'reference', to: [{ type: 'nav' }] },
      ],
    }),
  ],
})
