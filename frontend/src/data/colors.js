export const COLORS = {
  ink: '#232B33',
  walnut: '#6B4A3A',
  olive: '#5B5C42',
  slate: '#455A64',
  tobacco: '#7A5C3E',
  bone: '#8C7F63',
  rust: '#8C4A34',
  charcoal: '#3E4C59',
}

export const COLOR_LIST = Object.keys(COLORS)

export const COLOR_HEX = {
  'Ink Black': '#20242A',
  Charcoal: '#3E4C59',
  Walnut: '#6B4A3A',
  Olive: '#5B5C42',
  Bone: '#C9BFA6',
  Navy: '#28344A',
  Cognac: '#96552F',
  Slate: '#5C6B74',
}

export function seededPick(seed, arr) {
  return arr[seed % arr.length]
}
