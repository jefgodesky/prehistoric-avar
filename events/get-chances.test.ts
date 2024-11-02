import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import getChances from './get-chances.ts'

describe('getChances', () => {
  it('returns an array of booleans to be sampled', () => {
    expect(getChances(2, 5)).toEqual([true, true, false, false, false])
  })
})
