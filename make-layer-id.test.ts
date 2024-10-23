import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { LAYER } from './layer.ts'
import makeLayerId from './make-layer-id.ts'

describe('makeLayerId', () => {
  it('makes a surface ID', () => {
    expect(makeLayerId('F01', LAYER.SURFACE)).toBe('FS01')
  })

  it('makes a near-surface ID', () => {
    expect(makeLayerId('F01', LAYER.NEAR_SURFACE)).toBe('FC01')
  })

  it('makes a World Below ID', () => {
    expect(makeLayerId('F01', LAYER.WORLD_BELOW)).toBe('FD01')
  })
})
