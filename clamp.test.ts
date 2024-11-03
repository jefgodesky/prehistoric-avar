import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import clamp from './clamp.ts'

describe('clamp', () => {
  it('returns the value given if it is between min and max', () => {
    expect(clamp(2, 1, 3)).toBe(2)
  })

  it('returns min if the value is less than that', () => {
    expect(clamp(0, 1, 3)).toBe(1)
  })

  it('returns max if the value is more than that', () => {
    expect(clamp(4, 1, 3)).toBe(3)
  })
})
