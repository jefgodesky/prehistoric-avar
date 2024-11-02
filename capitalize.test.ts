import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import capitalize from './capitalize.ts'

describe('capitalize', () => {
  it('capitalizes a string', () => {
    expect(capitalize('test')).toBe('Test')
  })

  it('has no observable effect on strings that are already capitalized', () => {
    const str = 'Test'
    expect(capitalize(str)).toBe(str)
  })
})
