import { intersect, sample } from '@std/collections'
import { parse } from 'yaml'
import type { IRegionData } from '../index.d.ts'
import parseRegionId from './parse-region-id.ts'
import {SpeciesName, type Biome, SPECIES_NAMES, BIOMES} from '../enums.ts'

const yaml = await Deno.readTextFile('./data/data.yml')
const data = parse(yaml) as IRegionData

/*
 *   Each volcano on the surface layer should be paired with volcanic pipe
 *   features in the cave and World Below regions beneath it. This requires
 *   a bit more coordination than our other features, so we'll need to loop
 *   through our regions first to get the area for each one, use that to
 *   determine how many volcanoes each one should have, and then use that
 *   to create the pipes below it.
 */

let volcanoIndex = 1
const volcanic = ['MS06', 'MS08', 'MS09', 'MS10', 'MS11', 'MS13', 'MS14']
const volcanoes: { [key: string]: Array<[boolean, number]> } = {}

for (const id in data) {
  if (!volcanic.includes(id)) continue
  const region = data[id]
  if (!region) continue
  volcanoes[id] = []
  const num = Math.round(region.area / 10000)
  for (let i = 0; i < num; i++) {
    const isSuper = Math.random() < 0.01
    const impact = isSuper
      ? Math.round((Math.random() * 1000) + 1000) * -1
      : Math.round((Math.random() * 250) + 250) * -1
    volcanoes[id].push([isSuper, impact])
  }
}

for (const id in data) {
  const region = data[id]
  if (volcanic.includes(id)) region.tags.push('volcanic')

  const dragons = []
  if (region.tags.includes('coastal')) dragons.push('storm dragon')
  if (region.tags.includes('forest')) dragons.push('forest dragon')
  if (region.tags.includes('mountains')) dragons.push('night dragon')
  if (region.tags.includes('volcanic')) dragons.push('flame dragon')
  if (region.tags.includes('polar')) dragons.push('frost dragon')
  if (region.tags.includes('boreal')) dragons.push('frost dragon')

  const features = []

  // Add oases in the desert
  if (region.tags.includes('desert')) {
    const num = Math.round(region.area / 100000)
    for (let i = 0; i < num; i++) {
      features.push({ description: 'Oasis', impact: Math.round((Math.random() * 100) + 50) })
    }
  }

  // Add glaciers and volcanoes to mountains
  if (region.tags.includes('mountains')) {
    const glaciers = Math.round(region.area / ((Math.random() * 10000) + 5000))
    for (let i = 0; i < glaciers; i++) {
      features.push({ description: 'Glacier', impact: -100 })
    }
  }

  // Add Grandmother Trees to boreal forests
  if (region.tags.includes('boreal')) {
    const num = Math.round(region.area / ((Math.random() * 15000) + 15000) )
    for (let i = 0; i < num; i++) {
      features.push({ description: 'Grandmother Tree', impact: Math.round((Math.random() * 250) + 250) })
    }
  }

  // Add volcanoes or volcanic pipes
  const info = parseRegionId(id)
  const surfaceRegionId = `${info[0]}S${info[2]}`
  if (volcanic.includes(surfaceRegionId)) {
    for (const [isSuper, impact] of volcanoes[surfaceRegionId]) {
      const vid = `(${volcanoIndex.toString().padStart(4, '0')})`
      const description = id === surfaceRegionId
        ? isSuper
          ? `Supervolcano ${vid}`
          : `Volcano ${vid}`
        : `Volcanic pipe ${vid}`
      features.push({ description, impact })
      volcanoIndex++
    }
  }

  // Add underground lakes and seas to the World Below
  if (region.tags.includes('world-below')) {
    // Not if it has volcanic pipes or is adjacent to a region with them
    const adjacentSurfaceRegions = [surfaceRegionId, ...region.adjacent.map(id => {
      const info = parseRegionId(id)
      return `${info[0]}S${info[2]}`
    })]
    if (intersect(adjacentSurfaceRegions, volcanic).length === 0) {
      const numLakeCandidates = [8, 7, 7]
      for (let i = 0; i < 3; i++) numLakeCandidates.push(6)
      for (let i = 0; i < 4; i++) numLakeCandidates.push(5)
      for (let i = 0; i < 5; i++) numLakeCandidates.push(4)
      for (let i = 0; i < 6; i++) numLakeCandidates.push(3)
      for (let i = 0; i < 7; i++) numLakeCandidates.push(2)
      for (let i = 0; i < 8; i++) numLakeCandidates.push(1)
      for (let i = 0; i < 9; i++) numLakeCandidates.push(0)
      const numLakes = sample(numLakeCandidates) ?? 0
      const lakes: number[] = []
      const seaArea = Math.round((1 - (Math.random() * 0.2)) * region.area)
      let makeSea = false
      let totalArea = 0
      for (let i = 0; i < numLakes; i++) {
        const area = Math.round((Math.random() * 5000) + 1000)
        totalArea += area
        if (totalArea > seaArea) { makeSea = true; break}
        lakes.push(area)
      }

      if (makeSea) {
        features.push({ description: `Underground sea (${seaArea} sq. km)`, impact: seaArea * 100 })
      } else {
        for (const area of lakes) {
          features.push({ description: `Underground lake (${area} sq. km)`, impact: area * 100 })
        }
      }

      if (numLakes > 6) {
        const initialArea = Math.round((Math.random() * 50000) + 50000)
        const area = initialArea > region.area * 0.8
          ? Math.round(region.area * ((Math.random() * 0.2) + 0.7))
          : initialArea
        features.push({ description: `Underground sea (${area} sq. km)`, impact: area * 100 })
      } else {
        let totalLakeArea = 0
        for (let i = 0; i < numLakes; i++) {
          const area = Math.round((Math.random() * 500) + 500)
          totalLakeArea += area
          if (totalLakeArea < region.area) {
            features.push({ description: `Underground lake (${area} sq. km)`, impact: area * 100 })
          }
        }
      }
    }
  }

  const featureStr = features.length < 1
    ? ''
    : '\n' + features.map(feature => `    {\n      description: '${feature.description}',\n      impact: ${feature.impact}\n    }`).join(',\n') + '\n  '

  const speciesBiomes: Record<Biome, SpeciesName | null> = {
    [BIOMES.BOREAL_FOREST]: SPECIES_NAMES.ORC,
    [BIOMES.TEMPERATE_FOREST]: null,
    [BIOMES.TROPICAL_FOREST]: null,
    [BIOMES.DESERT]: null,
    [BIOMES.SAVANNA]: SPECIES_NAMES.HUMAN,
    [BIOMES.TEMPERATE_GRASSLAND]: null,
    [BIOMES.MOUNTAINS]: SPECIES_NAMES.DWARF,
    [BIOMES.POLAR]: SPECIES_NAMES.ORC,
    [BIOMES.CAVES]: null,
    [BIOMES.WORLD_BELOW]: SPECIES_NAMES.GNOME,
  }

  const species = region.biome in speciesBiomes
    ? speciesBiomes[region.biome]
    : id === 'FS32'
      ? SPECIES_NAMES.HALFLING
      : null

  const before = `import { IRegion } from '../../index.d.ts'

const ${id}: IRegion = {
  id: '${id}',
  adjacentRegions: [${region.adjacent.map(id => `'${id}'`).join(', ')}],
  area: ${region.area},
  biome: '${region.biome}',
  capacity: ${region.capacity},
  dragons: [${dragons.map(dragon => `'${dragon}'`).join(', ')}],
  features: [${featureStr}],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  markers: [],
  ogrism: 0,
  populations: [],`
  const sp = species ? `
  species: ${species},` : ''
  const after = `
  tags: [${region.tags.map(tag => `'${tag}'`).join(', ')}],
}

export default ${id}
`

  const ts = before + sp + after
  await Deno.writeTextFile(`./instances/regions/${id}.ts`, ts)
}
