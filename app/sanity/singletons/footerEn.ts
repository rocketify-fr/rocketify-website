import { defineField, defineType } from 'sanity'

export const footerEn = defineType({
  name: 'footerEn',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: 'en',
    }),
    defineField({
      name: 'logo',
      type: 'customImage',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'menuTitle',
      type: 'string',
    }),
    defineField({
      name: 'menu',
      type: 'reference',
      to: [{ type: 'nav' }],
    }),
    defineField({
      name: 'contactTitle',
      type: 'string',
    }),
    defineField({
      name: 'contactMenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    // to do
    defineField({
      name: 'certificationsTitle',
      type: 'string',
    }),
    defineField({
      name: 'certifications',
      type: 'array',
      of: [{ type: 'certificationType' }],
    }),
    defineField({
      name: 'menuSubFooter',
      type: 'reference',
      to: [{ type: 'nav' }],
    }),
  ],
})
