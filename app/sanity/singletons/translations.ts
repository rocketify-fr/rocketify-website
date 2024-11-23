import { defineArrayMember, defineField, defineType } from 'sanity'

import { languages } from '../structure'

export const translations = defineType({
  name: 'translations',
  title: 'Translations',
  type: 'document',
  fields: [
    {
      name: 'namespaces',
      type: 'array',
      title: 'Namespaces',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'namespace',
              type: 'string',
              title: 'Namespace',
            },
            {
              name: 'translations',
              type: 'array',
              title: 'Translations',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'key',
                      type: 'string',
                      title: 'Key',
                    },
                    ...languages.map((l) => ({
                      type: 'string',
                      name: l.id,
                    })),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  // [
  //   defineField({
  //     name: 'title',
  //     type: 'string',
  //     title: 'Title',
  //     readOnly: true,
  //     hidden: true,
  //     initialValue: 'Translations',
  //   }),
  //   defineField({
  //     name: 'items',
  //     type: 'array',
  //     title: 'Items',
  //     of: [
  //       defineField({
  //         type: 'object',
  //         name: 'item',
  //         fields: [
  //           defineField({
  //             name: 'key',
  //             type: 'string',
  //           }),
  //           ...languages.map((language) =>
  //             defineField({
  //               name: language.id,
  //               type: 'string',
  //             })
  //           ),
  //         ],
  //       }),
  //     ],
  //   }),
  //   // defineField({
  //   //   name: 'language',
  //   //   type: 'string',
  //   //   readOnly: true,
  //   //   hidden: true,
  //   //   initialValue: 'fr',
  //   // }),
  //   // defineField({
  //   //   name: 'logo',
  //   //   type: 'customImage',
  //   // }),
  //   // defineField({
  //   //   name: 'menuHeader',
  //   //   type: 'reference',
  //   //   to: [{ type: 'nav' }],
  //   // }),
  // ],
})
