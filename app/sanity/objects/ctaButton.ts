import {defineField, defineType} from 'sanity'
export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'CTA button',
  type: 'document',
  fields: [
    defineField({
      name: 'link',
      type: 'customLink',
    }),
    {
      name: 'colorName',
      title: 'Color Name',
      type: 'string',
      description: 'Name of the Tailwind CSS color class',
      options: {
        list: [
          {title: 'Dark (Noir)', value: 'rDark'},
          {title: 'Green (Vert)', value: 'rGreen'},
          {title: 'Green Hover (Vert hover)', value: 'rGreenHover'},
          {title: 'Purple (Mauve base)', value: 'rPurple'},
          {title: 'Purple Hover (Mauve hover)', value: 'rPurpleHover'},
          {title: 'Turquoise', value: 'rTurquoise'},
          {title: 'Azure', value: 'rAzure'},
          {title: 'Deep Blue (Sombre)', value: 'rDeepBlue'},
        ],
      },
    },
  ],
})
