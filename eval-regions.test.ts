import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { parse } from 'npm:yaml'
import type { IRegion } from './index.t.ts'
import evalRegions from './eval-regions.ts'

describe('evalRegions', () => {
  const input = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1728" height="901">
      <g id="F01" class="region forest boreal">
        <path class="body" d="M0,0 L100,0 L100,100 L0,100 Z" />
      </g>
      <g id="D01" class="region desert hot">
        <path class="body" d="M200,200 L300,200 L300,300 L200,300 Z" />
      </g>
    </svg>
  `

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

  it('evaluates the correct number of regions', () => {
    const result = evalRegions(input, data)
    expect(Object.keys(result).length).toBe(2)
  })

  it('correctly assigns tags to regions', () => {
    const result = evalRegions(input, data)
    expect(result.F01.tags).toEqual(['forest', 'boreal'])
    expect(result.D01.tags).toEqual(['desert', 'hot'])
  })

  it('calculates area for each region', () => {
    const result = evalRegions(input, data)
    expect(result.F01.area).toBe(527461)
    expect(result.D01.area).toBe(2326880)
  })

  it('calculates carrying capacity correctly', () => {
    const result = evalRegions(input, data)
    expect(result.F01.carryingCapacity).toBe(63295)
    expect(result.D01.carryingCapacity).toBe(93075)
  })

  it('skips regions not in our regions data', () => {
    const inputWithUnknownRegion = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1728" height="901">
        <g id="U01" class="region unknown">
          <path class="body" d="M0,0 L100,0 L100,100 L0,100 Z" />
        </g>
      </svg>
    `
    const result = evalRegions(inputWithUnknownRegion, data)
    expect(result).toEqual({})
  })
})
