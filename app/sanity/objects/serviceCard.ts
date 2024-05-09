import { defineField, defineType } from 'sanity'
export const serviceCard = defineType({
  name: 'serviceCard',
  title: 'Service card',
  type: 'document',
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
      name: 'icon',
      type: 'customImage',
    }),
    defineField({
      name: 'link',
      type: 'customLink',
    }),
  ],
})
