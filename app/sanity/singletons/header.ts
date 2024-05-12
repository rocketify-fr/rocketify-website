import { defineField, defineType } from 'sanity'
export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'customImage',
    }),
    defineField({
      name: 'menu',
      type: 'reference',
      to: [{ type: 'nav' }],
    }),
  ],
})
