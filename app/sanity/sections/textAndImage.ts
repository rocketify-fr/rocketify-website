import { defineField, defineType } from 'sanity'

export const textAndImage = defineType({
  name: 'textAndImage',
  title: 'Text & Image section',
  type: 'object',
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
      name: 'image',
      type: 'customImage',
    }),
  ],
})
