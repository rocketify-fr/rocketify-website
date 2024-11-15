import {
  ComposeIcon,
  RocketIcon,
  TagIcon,
  ThListIcon,
  UserIcon,
} from '@sanity/icons'
import { StickyNote } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: StickyNote,
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
      name: 'tags',
      title: 'Tags',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'moreDetailsPosts',
      title: 'More details posts',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'similarProjectPosts',
      title: 'Similar project posts',
      options: {
        collapsible: true,
      },
    },
    {
      name: 'hero',
      title: 'Hero',
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
      name: 'testimonial',
      title: 'Testimonial',
      icon: UserIcon,
    },
    {
      name: 'moreDetailsPosts',
      title: 'More details posts',
      icon: UserIcon,
    },
    {
      name: 'similarProjectPosts',
      title: 'Similar project posts',
      icon: UserIcon,
    },
    {
      name: 'hero',
      title: 'Hero',
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
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'publishStatus',
      type: 'publishStatus',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'heroSection' }, { type: 'headband' }],
        },
        { type: 'serviceHighlights' },
        { type: 'projectShowcase' },
        { type: 'methodology' },
        { type: 'headingTagline' },
        { type: 'blogPostsGrid' },
        { type: 'useCaseGrid' },
        { type: 'rawContent' },
      ],
      group: 'editorial',
      fieldset: 'editorial',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      fieldset: 'seo',
    }),
  ],
})
