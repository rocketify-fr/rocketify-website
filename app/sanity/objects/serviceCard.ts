import { defineField, defineType } from 'sanity'
export const serviceCard = defineType({
  name: 'serviceCard',
  title: 'Service card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'colorName',
      title: 'Color Name',
      type: 'string',
      description: 'Name of the Tailwind CSS color class',
      options: {
        list: [
          { title: 'Dark (Noir)', value: 'rDark' },
          { title: 'Green (Vert)', value: 'rGreen' },
          { title: 'Green Hover (Vert hover)', value: 'rGreenHover' },
          { title: 'Purple (Mauve base)', value: 'rPurple' },
          { title: 'Purple Hover (Mauve hover)', value: 'rPurpleHover' },
          { title: 'Turquoise', value: 'rTurquoise' },
          { title: 'Azure', value: 'rAzure' },
          { title: 'Deep Blue (Sombre)', value: 'rDeepBlue' },
        ],
      },
    }),
    defineField({
      name: 'link',
      type: 'customLink',
    }),
  ],
})
