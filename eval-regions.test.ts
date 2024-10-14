import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { parse } from 'npm:yaml'
import type { IRegion } from './index.t.ts'
import evalRegions from './eval-regions.ts'

describe('evalRegions', () => {
  const regions = `
Boreal forests:
  Class names:
    - forest
    - boreal
  Carrying capacity score: 12
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

  const data = parse(regions) as Record<string, IRegion>

  it('evaluates the correct number of regions', async () => {
    const result = await evalRegions(data)
    expect(Object.keys(result).length).toBe(2)
  })

  it('correctly assigns tags to regions', async () => {
    const result = await evalRegions(data)
    expect(result.F01.tags).toEqual(['forest', 'boreal'])
    expect(result.D01.tags).toEqual(['desert', 'hot'])
  })

  it('calculates area for each region', async () => {
    const result = await evalRegions(data)
    expect(result.F01.area).toBe(1272244)
    expect(result.D01.area).toBe(2688510)
  })

  it('calculates carrying capacity correctly', async () => {
    const result = await evalRegions(data)
    expect(result.F01.carryingCapacity).toBe(152669)
    expect(result.D01.carryingCapacity).toBe(107540)
  })
})
