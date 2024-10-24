import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import getBiomeFromTags from './get-biome-from-tags.ts'

describe('getBiomeFromTags', () => {
  it('returns a null string if not given anything', () => {
    expect(getBiomeFromTags()).toEqual('')
  })

  it('can identify a boreal forest', () => {
    const tags = ['forest', 'surface', 'coastal', 'boreal']
    expect(getBiomeFromTags(...tags)).toEqual('Boreal forest')
  })

  it('can identify a temperate forest', () => {
    const tags = ['forest', 'surface', 'coastal', 'temperate']
    expect(getBiomeFromTags(...tags)).toEqual('Temperate forest')
  })

  it('can identify a tropical forest', () => {
    const tags = ['forest', 'surface', 'coastal', 'tropical']
    expect(getBiomeFromTags(...tags)).toEqual('Tropical forest')
  })

  it('can identify a desert', () => {
    const tags = ['desert', 'surface', 'coastal', 'hot']
    expect(getBiomeFromTags(...tags)).toEqual('Desert')
  })

  it('can identify a savanna', () => {
    const tags = ['grassland', 'surface', 'coastal', 'tropical']
    expect(getBiomeFromTags(...tags)).toEqual('Savanna')
  })

  it('can identify a temperate grassland', () => {
    const tags = ['grassland', 'surface', 'coastal', 'temperate']
    expect(getBiomeFromTags(...tags)).toEqual('Temperate grassland')
  })

  it('can identify a mountain range', () => {
    const tags = ['surface', 'coastal', 'mountains']
    expect(getBiomeFromTags(...tags)).toEqual('Mountain range')
  })

  it('can identify a polar region', () => {
    const tags = ['surface', 'coastal', 'polar']
    expect(getBiomeFromTags(...tags)).toEqual('Polar region')
  })

  it('can identify a cave system', () => {
    const tags = ['near-surface', 'other']
    expect(getBiomeFromTags(...tags)).toEqual('Cave system')
  })

  it('can identify a region of the World Below', () => {
    const tags = ['world-below', 'other']
    expect(getBiomeFromTags(...tags)).toEqual('World Below')
  })
})
