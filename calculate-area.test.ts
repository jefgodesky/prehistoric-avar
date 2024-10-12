import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import calculateArea from './calculate-area.ts'

describe('calculateArea', () => {
  it('calculates the area of a square', () => {
    expect(calculateArea('M0,0 L100,0 L100,100 L0,100 Z')).toBeCloseTo(1939254.7, 1)
  })

  it('calculates the area of a polygon', () => {
    expect(calculateArea('M0,0 L100,0 L150,50 L100,100 L0,100 Z')).toBeCloseTo(2424068.4, 1)
  })

  it('calculates the area of a path with no area', () => {
    expect(calculateArea('M0,0 L100,0 L100,0 L0,0 Z')).toBe(0)
  })
})
