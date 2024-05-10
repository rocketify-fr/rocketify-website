import { defineField, defineType } from 'sanity'

export const useCaseGrid = defineType({
  name: 'useCaseGrid',
  title: 'Use Case Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'displayTags',
      type: 'boolean',
    }),
    defineField({
      name: 'displaySort',
      type: 'boolean',
    }),
    defineField({
      name: 'displayPaginationTop',
      type: 'boolean',
    }),
    defineField({
      name: 'displayPaginationBottom',
      type: 'boolean',
    }),
    defineField({
      name: 'perPage',
      type: 'number',
    }),
  ],
})
