import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { parse } from 'npm:yaml'
import { BIOMES } from './enums.ts'
import type { ISpeciesYAML } from './index.d.ts'
import parseSpecies from './parse-species.ts'

describe('parseSpecies', () => {
  const speciesYAML = `
Wosan:
  Generation: 50
  Fitness:
    Boreal forest: 0
    Temperate forest: 1
    Tropical forest: 0
    Desert: -2
    Savanna: 2
    Temperate grassland: 1
    Mountain range: -2
    Polar region: -3
    Cave system: -3
    World Below: -1
Elf:
  Generation: 10
  Ancestor: Wosan
  Fitness:
    Boreal forest: 3
    Temperate forest: 3
    Tropical forest: 3
    Desert: -3
    Savanna: 0
    Temperate grassland: 0
    Mountain range: -3
    Polar region: -3
    Cave system: 0
    World Below: 1
  Language preferences:
    Typology:
      - Fusional
    Word order:
      - VSO
      - VOS
Human:
  Generation: 40
  Ancestor: Wosan
  Fitness:
    Boreal forest: 0
    Temperate forest: 1
    Tropical forest: 0
    Desert: -1
    Savanna: 2
    Temperate grassland: 2
    Mountain range: -2
    Polar region: -3
    Cave system: -3
    World Below: -1
  Language preferences: {}
  `

  const data = parse(speciesYAML) as ISpeciesYAML

  it('translates YAML into instances of the Species class', () => {
    const spp = parseSpecies(data)
    const biome = BIOMES.BOREAL_FOREST

    expect(spp.length).toEqual(3)

    expect(spp[0].name).toEqual('Wosan')
    expect(spp[0].ancestor).toEqual(null)
    expect(spp[0].generation).toEqual(50)
    expect(spp[0].getFitness(biome)).toEqual(0)
    expect(spp[0].canSpeak()).toEqual(false)

    expect(spp[1].name).toEqual('Elf')
    expect(spp[1].ancestor).toEqual('Wosan')
    expect(spp[1].generation).toEqual(10)
    expect(spp[1].getFitness(biome)).toEqual(3)
    expect(spp[1].canSpeak()).toEqual(true)

    expect(spp[2].name).toEqual('Human')
    expect(spp[2].ancestor).toEqual('Wosan')
    expect(spp[2].generation).toEqual(40)
    expect(spp[2].getFitness(biome)).toEqual(0)
    expect(spp[2].canSpeak()).toEqual(true)
  })
})
