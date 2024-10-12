import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { parse } from 'npm:yaml'
import getCarryingCapacityScore from './get-carrying-capacity-score.ts'
import type {IRegion} from './index.t.ts'

describe('getCarryingCapacityScore', () => {
  const yaml = `
Boreal forests:
  Class names:
    - forest
    - boreal
  Carrying capacity score: 12
  Regions:
    - F01
  `
  const data = parse(yaml) as Record<string, IRegion>

  it('returns the carrying capacity score that matches the tags', () => {
    expect(getCarryingCapacityScore(['forest', 'boreal'], data)).toBe(12)
  })

  it('returns zero if there is no exact match', () => {
    expect(getCarryingCapacityScore(['forest'], data)).toBe(0)
  })
})
