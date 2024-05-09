import { defineArrayMember, defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
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
      name: 'faqItems',
      type: 'array',
      of: [defineArrayMember({ type: 'summaryItem' })],
    }),
  ],
})
