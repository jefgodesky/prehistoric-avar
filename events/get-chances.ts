const getChances = (chances: number, total: number): boolean[] => {
  const possibilities: boolean[] = []
  for (let i = 0; i < chances; i++) possibilities.push(true)
  for (let i = 0; i < total - chances; i++) possibilities.push(false)
  return possibilities
}

export default getChances
