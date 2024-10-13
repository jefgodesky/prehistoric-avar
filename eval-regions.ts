import { DOMParser } from 'npm:xmldom'
import commandsToArea from './commands-to-area.ts'
import getCarryingCapacityScore from './get-carrying-capacity-score.ts'
import getRegionIdList from './get-region-id-list.ts'
import type { IRegion, IRegionData } from './index.t.ts'

export const evalRegions = (input: string, regions: Record<string, IRegion>): IRegionData => {
  const idList = getRegionIdList(regions)
  const parser = new DOMParser()
  const doc = parser.parseFromString(input, 'text/xml')
  const groups = Array.from(doc.getElementsByTagName('g')) as Element[]
  const data: IRegionData = {}

  for (const group of groups) {
    const id = group.getAttribute('id')
    const classes: string[] = (group.getAttribute('class') ?? '').split(' ')
    if (id && idList.includes(id) && classes.includes('region')) {
      const tags = classes.filter(tag => tag !== 'region')
      const paths = group.getElementsByTagName('path')
      const body = Array.from(paths).find(path => path.getAttribute('class') === 'body')
      if (body) {
        const pathData = body.getAttribute('d') ?? ''
        const areaInSquareKm = commandsToArea(pathData)
        const area = Math.round(areaInSquareKm)
        const score = getCarryingCapacityScore(tags, regions)
        const carryingCapacity = Math.floor((area / 100) * score)
        data[id] = { tags, area, carryingCapacity }
      }
    }
  }

  return data
}

export default evalRegions
