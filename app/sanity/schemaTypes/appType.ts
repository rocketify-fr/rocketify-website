import {
  ComposeIcon,
  RocketIcon,
  TagIcon,
  ThListIcon,
  UserIcon,
} from '@sanity/icons'
import { StickyNote } from 'lucide-react'
import { defineField, defineType } from 'sanity'

import { isUniqueOtherThanLanguage } from '~/utils/slug'

export const appType = defineType({
  name: 'app',
  title: 'App',
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
      name: 'similarApps',
      title: 'Similar apps',
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
      name: 'similarApps',
      title: 'Similar apps',
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
      group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'publishStatus',
      type: 'publishStatus',
      group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: isUniqueOtherThanLanguage,
      },
      group: 'details',
      fieldset: 'details',
    }),
    defineField({
      name: 'description',
      type: 'text',
      group: 'details',
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
        {
          type: 'reference',
          to: [{ type: 'heroSection' }, { type: 'headband' }],
        },
        { type: 'serviceHighlights' },
        { type: 'projectShowcase' },
        { type: 'methodology' },
        { type: 'faq' },
        { type: 'painPoints' },
        { type: 'headingTagline' },
        { type: 'textAndImage' },
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
