import { parse, stringify } from 'yaml'
import calculateArea from './calculate-area.ts'
import calculateCarryingCapacity from './calculate-carrying-capacity.ts'
import getAdjacencyList from './get-adjacency-list.ts'
import getBiomeFromTags from './get-biome-from-tags.ts'
import parseRegionId from './parse-region-id.ts'
import { BIOMES } from './enums.ts'
import type { IBiome, IRegionData } from './index.d.ts'
import type { Layer } from './enums.ts'

interface IEvalRegionsData {
  regions: Record<string, IBiome>
  adjacency: Record<string, string[]>
  coastal: string[]
}

export const evalRegions = async (input: IEvalRegionsData): Promise<IRegionData> => {
  const { regions, adjacency, coastal } = input
  const data: IRegionData = {}

  for (const regionType in regions) {
    const score = regions[regionType]['Carrying capacity score']

    for (const id of regions[regionType].Regions) {
      const [code, num] = parseRegionId(id)
      const givenTags = regions[regionType]['Class names'].slice()
      const tags = coastal.includes(id)
        ? [...givenTags, 'surface', 'coastal']
        : [...givenTags, 'surface']
      const layers = [
        { code: 'S', score, tags, regionType, species: regions[regionType].Species },
        { code: 'C', score: 2, tags: ['near-surface'], regionType: 'Near-surface subterranean', species: undefined },
        { code: 'D', score: 10, tags: ['world-below'], regionType: 'World Below', species: 'Gnome' }
      ]

      for (const layer of layers) {
        const layerId = [code, layer.code, num].join('')
        const area = await calculateArea(id)
        const biome = getBiomeFromTags(...layer.tags) ?? BIOMES.CAVES
        const capacity = calculateCarryingCapacity(area, layer.score)
        const adjacent = getAdjacencyList(id, adjacency, layer.code as Layer)
        data[layerId] = { biome, tags: layer.tags, area, capacity, adjacent, species: layer.species }
      }
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
      const adjacencyYAML = await Deno.readTextFile('adjacency.yml')
      const coastalTXT = await Deno.readTextFile('coastal.txt')
      const regions = parse(regionsYAML) as Record<string, IBiome>
      const adjacency = parse(adjacencyYAML) as Record<string, string[]>
      const coastal = coastalTXT.split('\n')
      const result = await evalRegions({ regions, adjacency, coastal })
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
