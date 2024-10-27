import { parse } from 'yaml'
import type { IRegionData } from '../index.d.ts'

const yaml = await Deno.readTextFile('data.yml')
const data = parse(yaml) as IRegionData

for (const id in data) {
  const region = data[id]

  const dragons = []
  if (region.tags.includes('coastal')) dragons.push('storm dragon')
  if (region.tags.includes('forest')) dragons.push('forest dragon')
  if (region.tags.includes('mountains')) dragons.push('flame dragon', 'night dragon')
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
    const glaciers = Math.round(region.area / 10000)
    for (let i = 0; i < glaciers; i++) {
      features.push({ description: 'Glacier', impact: -100 })
    }

    const volcanoes = Math.round(region.area / 1000000)
    for (let i = 0; i < volcanoes; i++) {
      features.push({ description: 'Volcano', impact: 0 })
    }
  }

  // Add Grandmother Trees to boreal forests
  if (region.tags.includes('boreal')) {
    const num = Math.round(region.area / 1000)
    for (let i = 0; i < num; i++) {
      features.push({ description: 'Grandmother Tree', impact: Math.round((Math.random() * 250) + 250) })
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
  ogrism: 0,
  populations: [],
  tags: [${region.tags.map(tag => `'${tag}'`).join(', ')}],
}

export default ${id}
`
  await Deno.writeTextFile(`./instances/regions/${id}.ts`, ts)
}
