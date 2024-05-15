export const colors = {
  black: '#000000',
  rDark: '#222A2B',
  rGreen: '#99E800',
  rGreenHover: '#B1FF1A',
  rPurple: '#C29FFC',
  rPurpleHover: '#E3D2FE',
  rTurquoise: '#2FCCC8',
  rAzure: '#E1FCFF',
  rDeepBlue: '#0B134F',
}

export const colorNames = Object.keys(colors)

export const getColor = (rawColor: String = 'black') => {
  return colorNames.find((color) => rawColor.includes(color))
}
