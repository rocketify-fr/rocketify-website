import {defineField, defineType} from 'sanity'

export const certificationType = defineType({
  name: 'certificationType',
  title: 'Certification',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      type: 'customImage',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'issueDate',
      type: 'string',
    }),
  ],
})
