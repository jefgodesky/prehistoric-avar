import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { point } from '@turf/turf'
import commandsToPoints from './commands-to-points.ts'

describe('commandsToPoints', () => {
  it('converts a square path to four points', () => {
    const svgPath = 'M800,350 L1000,350 L1000,550 L800,550 Z'
    const result = commandsToPoints(svgPath)

    expect(result[0]).toEqual(point([-20, 20]))
    expect(result[1]).toEqual(point([20, 20]))
    expect(result[2]).toEqual(point([20, -20]))
    expect(result[3]).toEqual(point([-20, -20]))
  })

  it('converts more complex polygons', () => {
    const svgPath = 'M200,200 L200,400 L400,400 L400,300 L300,300 L300,200 Z'
    const result = commandsToPoints(svgPath)

    expect(result[0]).toEqual(point([-140, 50]))
    expect(result[1]).toEqual(point([-140, 10]))
    expect(result[2]).toEqual(point([-100, 10]))
    expect(result[3]).toEqual(point([-100, 30]))
    expect(result[4]).toEqual(point([-120, 30]))
    expect(result[5]).toEqual(point([-120, 50]))
  })
})
