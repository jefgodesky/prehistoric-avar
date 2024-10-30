import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import oxford from './oxford.ts'

describe('oxford', () => {
  it('returns a null string if not given anything', () => {
    expect(oxford()).toBe('')
  })

  it('returns a single string', () => {
    expect(oxford('foo')).toBe('foo')
  })

  it('combines two elements with and', () => {
    expect(oxford('foo', 'bar')).toBe('foo and bar')
  })

  it('uses an Oxford comma for three or more elements', () => {
    expect(oxford('foo', 'bar', 'baz')).toBe('foo, bar, and baz')
  })
})
