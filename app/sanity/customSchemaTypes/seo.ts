import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  type: 'object',
  title: 'efee',
  fields: [
    defineField({
      name: 'title',
      title: 'Title for SEO & social sharing (OG)',
      type: 'string',
      description: 'Ideally between 55 and 70 characters.',
      validation: (rule) => rule.required().min(10).max(80),
    }),
    defineField({
      name: 'description',
      title: 'Short paragraph for SEO & social sharing (meta / OG description)',
      description: '🚀 Ideally between 55 and 160 characters.',
      type: 'text',
      validation: (rule) => rule.required().min(55).max(160),
    }),
  ],
})
