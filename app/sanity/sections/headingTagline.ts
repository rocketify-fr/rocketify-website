import { defineField, defineType } from 'sanity'

export const headingTagline = defineType({
  name: 'headingTagline',
  title: 'Heading & tagline',
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
  ],
})
