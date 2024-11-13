import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Singleton from './Singleton.ts'

class Test {
  value: number

  constructor (value: number) {
    this.value = value
  }
}

const SingletonTest = Singleton(Test)

describe('Singleton', () => {
  it('returns an instance', () => {
    const actual = SingletonTest.instance(1)
    expect(actual.value).toBe(1)
  })

  it('returns the same instance', () => {
    const i1 = SingletonTest.instance(1)
    const i2 = SingletonTest.instance(2)
    expect(i1.value).toBe(1)
    expect(i2.value).toBe(1)
    expect(i1).toBe(i2)
  })

  it('can be reset', () => {
    SingletonTest.instance(1)
    SingletonTest.reset()
    const actual = SingletonTest.instance(2)
    expect(actual.value).toBe(2)
  })
})
