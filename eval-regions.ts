import { parse, stringify } from 'yaml'
import calculateArea from './calculate-area.ts'
import calculateCarryingCapacity from './calculate-carrying-capacity.ts'
import type { IRegion, IRegionData } from './index.t.ts'

export const evalRegions = async (regions: Record<string, IRegion>): Promise<IRegionData> => {
  const data: IRegionData = {}

  for (const regionType in regions) {
    const tags = regions[regionType]['Class names'].slice()
    const score = regions[regionType]['Carrying capacity score']

    for (const id of regions[regionType].Regions) {
      const area = await calculateArea(id)
      const carryingCapacity = calculateCarryingCapacity(area, score)
      data[id] = { tags, area, carryingCapacity}
    }
  }

  return data
}

if (import.meta.main) {
  const main = async (): Promise<void> => {
    if (Deno.args.length !== 1) {
      console.error('Usage: deno task eval <output>')
      Deno.exit(1)
    }

    const [output] = Deno.args
    try {
      const regionsYAML = await Deno.readTextFile('regions.yml')
      const regions = parse(regionsYAML) as Record<string, IRegion>
      const result = await evalRegions(regions)
      const resultYAML = stringify(result)
      await Deno.writeTextFile(`./${output}.yml`, resultYAML)
      console.log(`Region evaluation successfully written to ./${output}.yml`)
    } catch (error) {
      console.error('Error: ', error)
      Deno.exit(1)
    }
  }

  main()
}

export default evalRegions
