import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { parse } from 'npm:yaml'
import { BIOMES } from './enums.ts'
import type { IBiome } from './index.d.ts'
import evalRegions from './eval-regions.ts'

describe('evalRegions', () => {
  const adjacencyYAML = `
F01:
  - D01
D01:
  - F01
`

  const regionsYAML = `
Boreal forests:
  Class names:
    - forest
    - boreal
  Carrying capacity score: 12
  Species: Sasquatch
  Regions:
    - F01
Hot deserts:
  Class names:
    - desert
    - hot
  Carrying capacity score: 4
  Regions:
    - D01
  `

  const data = {
    regions: parse(regionsYAML) as Record<string, IBiome>,
    adjacency: parse(adjacencyYAML) as Record<string, string[]>,
    coastal: ['F01']
  }

  it('evaluates the correct number of regions', async () => {
    const result = await evalRegions(data)
    expect(Object.keys(result).length).toBe(6)
  })

  it('correctly assigns biomes to regions', async () => {
    const result = await evalRegions(data)
    expect(result.FS01.biome).toEqual(BIOMES.BOREAL_FOREST)
    expect(result.FC01.biome).toEqual(BIOMES.CAVES)
    expect(result.FD01.biome).toEqual(BIOMES.WORLD_BELOW)
    expect(result.DS01.biome).toEqual(BIOMES.DESERT)
    expect(result.DC01.biome).toEqual(BIOMES.CAVES)
    expect(result.DD01.biome).toEqual(BIOMES.WORLD_BELOW)
  })

  it('correctly assigns tags to regions', async () => {
    const result = await evalRegions(data)
    expect(result.FS01.tags).toEqual(['forest', 'boreal', 'surface', 'coastal'])
    expect(result.FC01.tags).toEqual(['near-surface'])
    expect(result.FD01.tags).toEqual(['world-below'])
    expect(result.DS01.tags).toEqual(['desert', 'hot', 'surface'])
    expect(result.DC01.tags).toEqual(['near-surface'])
    expect(result.DD01.tags).toEqual(['world-below'])
  })

  it('calculates area for each region', async () => {
    const result = await evalRegions(data)
    expect(result.FS01.area).toBe(1272233)
    expect(result.FC01.area).toBe(1272233)
    expect(result.FD01.area).toBe(1272233)
    expect(result.DS01.area).toBe(2688696)
    expect(result.DC01.area).toBe(2688696)
    expect(result.DD01.area).toBe(2688696)
  })

  it('calculates carrying capacity correctly', async () => {
    const result = await evalRegions(data)
    expect(result.FS01.capacity).toBe(25444)
    expect(result.FC01.capacity).toBe(4240)
    expect(result.FD01.capacity).toBe(21203)
    expect(result.DS01.capacity).toBe(17924)
    expect(result.DC01.capacity).toBe(8962)
    expect(result.DD01.capacity).toBe(44811)
  })

  it('returns an adjacency list', async () => {
    const result = await evalRegions(data)
    expect(result.FS01.adjacent).toHaveLength(2)
    expect(result.FS01.adjacent).toContain('FC01')
    expect(result.FS01.adjacent).toContain('DS01')
    expect(result.FC01.adjacent).toHaveLength(3)
    expect(result.FC01.adjacent).toContain('FS01')
    expect(result.FC01.adjacent).toContain('FD01')
    expect(result.FC01.adjacent).toContain('DC01')
    expect(result.FD01.adjacent).toHaveLength(2)
    expect(result.FD01.adjacent).toContain('FC01')
    expect(result.FD01.adjacent).toContain('DD01')

    expect(result.DS01.adjacent).toHaveLength(2)
    expect(result.DS01.adjacent).toContain('DC01')
    expect(result.DS01.adjacent).toContain('FS01')
    expect(result.DC01.adjacent).toHaveLength(3)
    expect(result.DC01.adjacent).toContain('DS01')
    expect(result.DC01.adjacent).toContain('DD01')
    expect(result.DC01.adjacent).toContain('FC01')
    expect(result.DD01.adjacent).toHaveLength(2)
    expect(result.DD01.adjacent).toContain('DC01')
    expect(result.DD01.adjacent).toContain('FD01')
  })

  it('sets speciation targets', async () => {
    const result = await evalRegions(data)
    expect(result.FS01.species).toBe('Sasquatch')
    expect(result.FC01.species).toBe(undefined)
    expect(result.FD01.species).toBe('Gnome')
    expect(result.DS01.species).toBe(undefined)
    expect(result.DC01.species).toBe(undefined)
    expect(result.DD01.species).toBe('Gnome')
  })
})
