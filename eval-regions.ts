import { DOMParser } from 'npm:xmldom'
import { parse, stringify } from 'npm:yaml'
import commandsToArea from './commands-to-area.ts'
import getCarryingCapacityScore from './get-carrying-capacity-score.ts'
import calculateCarryingCapacity from './calculate-carrying-capacity.ts'
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
        const carryingCapacity = calculateCarryingCapacity(area, getCarryingCapacityScore(tags, regions))
        data[id] = { tags, area, carryingCapacity }
      }
    }
  }

  return data
}

if (import.meta.main) {
  const main = async (): Promise<void> => {
    if (Deno.args.length !== 2) {
      console.error('Usage: deno task eval <map> <output>')
      Deno.exit(1)
    }

    const [map, output] = Deno.args
    try {
      const input = await Deno.readTextFile(`./maps/${map}.svg`)
      const regionsYAML = await Deno.readTextFile('regions.yml')
      const regions = parse(regionsYAML) as Record<string, IRegion>
      const result = evalRegions(input, regions)
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
