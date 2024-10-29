import { parse } from 'yaml'
import type { IRegionData } from '../index.d.ts'
import parseRegionId from './parse-region-id.ts'

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

const volcanic = ['MS06', 'MS08', 'MS09', 'MS10', 'MS11', 'MS13', 'MS14']
const volcanoes: { [key: string]: boolean[] } = {}

for (const id in data) {
  if (!volcanic.includes(id)) continue
  const region = data[id]
  if (!region) continue
  volcanoes[id] = []
  const num = Math.round(region.area / 10000)
  for (let i = 0; i < num; i++) {
    volcanoes[id].push(Math.random() < 0.01)
  }
}

for (const id in data) {
  const region = data[id]

  const dragons = []
  if (region.tags.includes('coastal')) dragons.push('storm dragon')
  if (region.tags.includes('forest')) dragons.push('forest dragon')
  if (region.tags.includes('mountains')) dragons.push('night dragon')
  if (region.tags.includes('polar')) dragons.push('frost dragon')
  if (region.tags.includes('boreal')) dragons.push('frost dragon')
  if (volcanic.includes(id)) dragons.push('flame dragon')

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
    const glaciers = Math.round(region.area / 10000)
    for (let i = 0; i < glaciers; i++) {
      features.push({ description: 'Glacier', impact: -100 })
    }
  }

  // Add Grandmother Trees to boreal forests
  if (region.tags.includes('boreal')) {
    const num = Math.round(region.area / 1000)
    for (let i = 0; i < num; i++) {
      features.push({ description: 'Grandmother Tree', impact: Math.round((Math.random() * 250) + 250) })
    }
  }

  // Add volcanoes or volcanic pipes
  const info = parseRegionId(id)
  const surfaceRegionId = `${info[0]}S${info[2]}`
  if (volcanic.includes(surfaceRegionId)) {
    for (const isSuper of volcanoes[surfaceRegionId]) {
      const description = id === surfaceRegionId ? isSuper ? 'Supervolcano' : 'Volcano' : 'Volcanic pipe'
      const impact = id === surfaceRegionId ? 0 : isSuper ? Math.round((Math.random() * 1000) + 1000) : Math.round((Math.random() * 250) + 250)
      features.push({ description, impact })
    }
  }

  const featureStr = features.length < 1
    ? ''
    : '\n' + features.map(feature => `    {\n      description: '${feature.description}',\n      impact: ${feature.impact}\n    }`).join(',\n') + '\n  '

  const ts = `import { IRegion } from '../../index.d.ts'

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
  populations: [],
  tags: [${region.tags.map(tag => `'${tag}'`).join(', ')}],
}

export default ${id}
`
  await Deno.writeTextFile(`./instances/regions/${id}.ts`, ts)
}
