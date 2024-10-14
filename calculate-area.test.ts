import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import calculateArea from './calculate-area.ts'

describe('calculateArea', () => {
  it('calculates the area of a region in square kilometers', async () => {
    const area = await calculateArea('G12')
    expect(area).toBe(388051)
  })
})
