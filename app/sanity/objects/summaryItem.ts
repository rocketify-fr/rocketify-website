import {defineField, defineType} from 'sanity'
export const summaryItem = defineType({
  name: 'summaryItem',
  title: 'Summary Item',
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
  ],
})
