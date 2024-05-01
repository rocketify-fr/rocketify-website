import {
  CodeBlockIcon,
  ComposeIcon,
  ImageIcon,
  RocketIcon,
  TagIcon,
  ThListIcon,
  UserIcon,
} from '@sanity/icons'
import {Newspaper} from 'lucide-react'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: Newspaper,
  fieldsets: [
    {
      name: 'details',
      title: 'Details',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'editorial',
      title: 'Editorial',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'author',
      title: 'Author',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'seo',
      title: 'SEO & social',
      options: {
        collapsible: true,
      },
    },
  ],

  groups: [
    {
      name: 'details',
      title: 'Details',
      icon: ThListIcon,
    },
    {
      name: 'editorial',
      title: 'Editorial',
      icon: ComposeIcon,
    },
    {
      name: 'tags',
      title: 'Tags',
      icon: TagIcon,
    },
    {
      name: 'author',
      title: 'Author',
      icon: UserIcon,
    },
    {
      name: 'seo',
      title: 'SEO & Social',
      icon: RocketIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: {
        source: 'title',
      },
      fieldset: 'details',
    }),
    defineField({
      name: 'image',
      type: 'customImage',
      group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({type: 'code', icon: CodeBlockIcon}),
        defineArrayMember({type: 'image', icon: ImageIcon}),
      ],
      group: 'editorial',
      fieldset: 'editorial',
    }),
    defineField({
      name: 'tags',
      type: 'reference',
      to: [{type: 'postTag'}],
      group: 'tags',
      fieldset: 'tags',
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'author',
      fieldset: 'author',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      fieldset: 'seo',
    }),
  ],
})
