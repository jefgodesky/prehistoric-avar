import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES } from './enums.ts'
import getBiomeFromTags from './get-biome-from-tags.ts'

describe('getBiomeFromTags', () => {
  it('returns a null string if not given anything', () => {
    expect(getBiomeFromTags()).toEqual('')
  })

  it('can identify a boreal forest', () => {
    const tags = ['forest', 'surface', 'coastal', 'boreal']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.BOREAL_FOREST)
  })

  it('can identify a temperate forest', () => {
    const tags = ['forest', 'surface', 'coastal', 'temperate']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.TEMPERATE_FOREST)
  })

  it('can identify a tropical forest', () => {
    const tags = ['forest', 'surface', 'coastal', 'tropical']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.TROPICAL_FOREST)
  })

  it('can identify a desert', () => {
    const tags = ['desert', 'surface', 'coastal', 'hot']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.DESERT)
  })

  it('can identify a savanna', () => {
    const tags = ['grassland', 'surface', 'coastal', 'tropical']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.SAVANNA)
  })

  it('can identify a temperate grassland', () => {
    const tags = ['grassland', 'surface', 'coastal', 'temperate']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.TEMPERATE_GRASSLAND)
  })

  it('can identify a mountain range', () => {
    const tags = ['surface', 'coastal', 'mountains']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.MOUNTAINS)
  })

  it('can identify a polar region', () => {
    const tags = ['surface', 'coastal', 'polar']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.POLAR)
  })

  it('can identify a cave system', () => {
    const tags = ['near-surface', 'other']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.CAVES)
  })

  it('can identify a region of the World Below', () => {
    const tags = ['world-below', 'other']
    expect(getBiomeFromTags(...tags)).toEqual(BIOMES.WORLD_BELOW)
  })
})
