import {defineField, defineType} from 'sanity'
export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'CTA button',
  type: 'document',
  fields: [
    defineField({
      name: 'link',
      type: 'customLink',
    }),
  ],
})
