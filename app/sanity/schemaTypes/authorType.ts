import {Users} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: Users,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'image',
      type: 'customImage',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image', // Use the userPortait image field as thumbnail
    },
  },
})
