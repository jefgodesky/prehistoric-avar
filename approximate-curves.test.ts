import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import approximateCurves from './approximate-curves.ts'

describe('approximateCurves', () => {
  it('approximates curves in an SVG path with straight lines', () => {
    const curvedPath = 'M10,10 C20,20, 40,20, 50,10 S90,0, 100,10'
    const expectedPath = 'M10,10 L10.00,10.00 L17.22,14.88 L25.63,17.22 L34.37,17.22 L42.78,14.88 L50.00,10.00 L50.00,10.00 L58.37,8.21 L66.78,6.82 L75.31,5.86 L83.81,5.57 L92.31,6.41 L100.00,10.00'
    expect(approximateCurves(curvedPath, 10)).toBe(expectedPath)
  })
})
