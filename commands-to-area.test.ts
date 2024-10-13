import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import commandsToArea from './commands-to-area.ts'

describe('commandsToArea', () => {
  it('calculates the area of a 1x1 degree square near the equator', () => {
    const svgPath = 'M900,450 L905,450 L905,445 L900,445 Z'
    expect(commandsToArea(svgPath)).toBeCloseTo(7615, 0)
  })

  it('calculates the area of a complex polygon', () => {
    const area = commandsToArea('M600,200 L1000,250 L1100,450 L900,650 L500,500 Z')
    expect(area).toBeCloseTo(49837274.6, 0)
  })
})
