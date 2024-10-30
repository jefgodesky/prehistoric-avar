const oxford = (...elems: string[]): string => {
  let exceptLast: string[]
  switch (elems.length) {
    case 0: return ''
    case 1: return elems[0]
    case 2: return `${elems[0]} and ${elems[1]}`
    default:
      exceptLast = elems.slice(0, elems.length - 1)
      return `${exceptLast.join(', ')}, and ${elems[elems.length - 1]}`
  }
}

export default oxford
