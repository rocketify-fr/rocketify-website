export const sanitize = (str: string): string => str.replaceAll('\ufeff', '')
