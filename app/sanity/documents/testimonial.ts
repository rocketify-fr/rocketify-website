import {defineField, defineType} from 'sanity'
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
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
