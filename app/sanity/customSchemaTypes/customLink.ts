import {defineField, defineType} from 'sanity'

export const customLink = defineType({
  name: 'customLink',
  title: 'Custom link',
  type: 'object',
  fields: [
    defineField({
      title: 'Select the type of link',
      description:
        'External links go to other websites using the format `https://www.google.com`. Internal links are restricted to other pages in the SANITY database.',
      name: 'linkType',
      type: 'string',
      options: {
        list: [
          {title: 'External', value: 'external'},
          {title: 'Internal', value: 'internal'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      title: 'URL',
      name: 'href',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external', // hidden if link type is not external
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel'],
        }),
    }),
    defineField({
      title: 'Open in new tab?',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean',
      hidden: ({parent}) => parent?.linkType !== 'external', // hidden if link type is not external
    }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      title: 'Internal Link',
      hidden: ({parent}) => parent?.linkType !== 'internal', // hidden if link type is not internal
      to: [
        {type: 'post'},
        {type: 'page'},
        // other types you may want to link to
      ],
    }),
  ],
  preview: {
    select: {
      linkType: 'linkType',
      href: 'href', // sélectionne l'URL de l'objet parent pour un lien externe
      internalLinkName: 'internalLink.title', // sélectionne le nom de l'objet référencé pour un lien interne
    },
    prepare({linkType, href, internalLinkName}) {
      console.log(linkType)
      // Retourne le nom pour un lien interne ou l'URL pour un lien externe
      const title =
        linkType === 'external' ? `🌎 ${href}` : `🔗 ${internalLinkName}`
      console.log(href)
      return {
        title: title || 'No link selected', // Affiche un titre par défaut si aucun lien n'est sélectionné
      }
    },
  },
})
