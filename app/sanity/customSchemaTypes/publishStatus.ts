import { defineType } from 'sanity'

export const publishStatus = defineType({
  name: 'publishStatus',
  type: 'string',
  title: 'Publish status',
  options: {
    list: [
      {
        title: '🔒 Private (not accessible outside preview)',
        value: 'private',
      },
      {
        title:
          "🕶️ Hidden (won't show up in Google, but accessible through URL)",
        value: 'hidden',
      },
      { title: '🟢 Public', value: 'public' },
    ],
    layout: 'radio',
  },
  initialValue: 'public',
})
