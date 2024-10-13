import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import coordsToPoint from './coords-to-point.ts'

describe('coordsToPoint', () => {
  it('converts (900, 450) to [0, 0]', () => {
    const  { longitude, latitude } = coordsToPoint(900, 450)
    expect(longitude).toBe(0)
    expect(latitude).toBe(0)
  })

  it('converts (1350, 225) to [90, 45]', () => {
    const  { longitude, latitude } = coordsToPoint(1350, 225)
    expect(longitude).toBe(90)
    expect(latitude).toBe(45)
  })

  it('converts (450, 225) to [-90, 45]', () => {
    const  { longitude, latitude } = coordsToPoint(450, 225)
    expect(longitude).toBe(-90)
    expect(latitude).toBe(45)
  })

  it('converts (1350, 675) to [90, -45]', () => {
    const  { longitude, latitude } = coordsToPoint(1350, 675)
    expect(longitude).toBe(90)
    expect(latitude).toBe(-45)
  })

  it('converts (450, 675) to [-90, -45]', () => {
    const  { longitude, latitude } = coordsToPoint(450, 675)
    expect(longitude).toBe(-90)
    expect(latitude).toBe(-45)
  })
})
