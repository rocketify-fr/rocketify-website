import { defineField, defineType } from 'sanity'

export const headband = defineType({
  name: 'headband',
  title: 'Headband',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'cta',
      type: 'ctaButton',
    }),
  ],
})
