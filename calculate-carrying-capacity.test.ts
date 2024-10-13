import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import calculateCarryingCapacity from './calculate-carrying-capacity.ts'

describe('calculateCarryingCapacity', () => {
  it('calculates carrying capacity', () => {
    expect(calculateCarryingCapacity(100, 100)).toBe(500)
  })

  it('factors in carrying capacity score', () => {
    expect(calculateCarryingCapacity(100, 50)).toBe(250)
  })
})
