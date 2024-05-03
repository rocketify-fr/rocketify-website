import {defineField, defineType} from 'sanity'
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'customImage',
    }),
    defineField({
      name: 'menu',
      type: 'array',
      of: [{type: 'customLink'}],
    }),
  ],
})
