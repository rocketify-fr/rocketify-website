import { defineField, defineType } from 'sanity'

export const headerFr = defineType({
  name: 'headerFr',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: 'fr',
    }),
    defineField({
      name: 'logo',
      type: 'customImage',
    }),
    defineField({
      name: 'menuHeader',
      type: 'reference',
      to: [{ type: 'nav' }],
    }),
  ],
})
