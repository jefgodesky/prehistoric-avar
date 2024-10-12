import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { parse } from 'npm:yaml'
import type { IRegion } from './index.t.ts'
import getRegionIdList from './get-region-id-list.ts'

describe('getRegionIdList', () => {
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
    - F01
  `

  const data = parse(regions) as Record<string, IRegion>

  it('compiles a list of all region IDs', () => {
    const result = getRegionIdList(data)
    expect(result.length).toBe(2)
    expect(result).toContain('F01')
    expect(result).toContain('D01')
  })
})
