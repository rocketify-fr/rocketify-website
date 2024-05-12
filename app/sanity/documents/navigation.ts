import { defineField, defineType } from 'sanity'
export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'customImage',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'job',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      type: 'customImage',
    }),
  ],
})
