import {
  ComposeIcon,
  RocketIcon,
  TagIcon,
  ThListIcon,
  UserIcon,
} from '@sanity/icons'
import { Newspaper } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const useCaseType = defineType({
  name: 'useCase',
  title: 'Use case',
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
      name: 'url',
      type: 'string',
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
      name: 'intro',
      type: 'useCaseIntro',
      group: 'editorial',
      fieldset: 'editorial',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'useCaseItem' }, { type: 'useCaseGallery' }],
      group: 'editorial',
      fieldset: 'editorial',
    }),
    defineField({
      name: 'testimonial',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      group: 'testimonial',
      fieldset: 'testimonial',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'useCaseTag' }],
      group: 'tags',
      fieldset: 'tags',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'moreDetailsPosts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      group: 'moreDetailsPosts',
      fieldset: 'moreDetailsPosts',
    }),
    defineField({
      name: 'similarProjectPosts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'useCase' }] }],
      group: 'similarProjectPosts',
      fieldset: 'similarProjectPosts',
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'heroSection' }] }],
      group: 'hero',
      fieldset: 'hero',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      fieldset: 'seo',
    }),
  ],
})
