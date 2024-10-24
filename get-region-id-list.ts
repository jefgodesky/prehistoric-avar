import type { IBiome } from './index.t.ts'

export const getRegionIdList = (regions: Record<string, IBiome>): string[] => {
  const arr = Object.keys(regions).map(key => regions[key].Regions).flat()
  return [...new Set(arr)]
}

export default getRegionIdList
