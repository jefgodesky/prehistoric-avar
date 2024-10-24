import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { LAYER } from './enums.ts'
import getAdjacencyList from './get-adjacency-list.ts'

describe('getAdjacencyList', () => {
  const data = { F01: ['F02'], F02: ['F01'] }

  it('defaults to the surface list', () => {
    const result = getAdjacencyList('F01', data)
    expect(result.length).toBe(2)
    expect(result).toContain('FC01')
    expect(result).toContain('FS02')
  })

  it('can get the near-surface list', () => {
    const result = getAdjacencyList('F01', data, LAYER.NEAR_SURFACE)
    expect(result.length).toBe(3)
    expect(result).toContain('FS01')
    expect(result).toContain('FD01')
    expect(result).toContain('FC02')
  })

  it('can get the World Below list', () => {
    const result = getAdjacencyList('F01', data, LAYER.WORLD_BELOW)
    expect(result.length).toBe(2)
    expect(result).toContain('FC01')
    expect(result).toContain('FD02')
  })
})
