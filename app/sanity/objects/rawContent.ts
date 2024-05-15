import { defineField, defineType } from 'sanity'
export const rawContent = defineType({
  name: 'rawContent',
  title: 'Raw content',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
