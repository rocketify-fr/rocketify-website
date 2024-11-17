import { defineField, defineType } from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'customImage',
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'menuTitle',
      type: 'internationalizedArrayString',
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
      type: 'internationalizedArrayString',
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
