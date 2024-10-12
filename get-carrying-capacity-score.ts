import { IRegion } from './index.t.ts'

const getCarryingCapacityScore = (tags: string[], data: Record<string, IRegion>): number => {
  for (const key of Object.keys(data)) {
    const allInRegion = tags.reduce((acc: boolean, curr) => acc && data[key]['Class names'].includes(curr), true)
    const regionAllInTags = data[key]['Class names'].reduce((acc: boolean, curr) => acc && tags.includes(curr), true)
    if (allInRegion && regionAllInTags) return data[key]['Carrying capacity score']
  }
  return 0
}

export default getCarryingCapacityScore
