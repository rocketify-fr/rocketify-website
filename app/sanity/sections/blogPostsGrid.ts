import { defineField, defineType } from 'sanity'

export const blogPostsGrid = defineType({
  name: 'blogPostsGrid',
  title: 'Blog posts grid',
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
