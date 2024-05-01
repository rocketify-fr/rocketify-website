import {defineField, defineType} from 'sanity'

export const customImage = defineType({
  name: 'customImage',
  title: 'Custom image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
})
