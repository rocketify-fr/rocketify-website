export const sanitize = (str: string): string =>
  str.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
