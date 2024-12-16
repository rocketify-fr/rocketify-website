import { defineField, defineType } from 'sanity'

export const headerEn = defineType({
  name: 'headerEn',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: 'en',
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
