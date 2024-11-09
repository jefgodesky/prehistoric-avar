import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Directory from './Directory.ts'

describe('Directory', () => {
  const key = 'test'
  const val = 'test value'

  describe('constructor', () => {
    it('creates a Directory instance', () => {
      const dir = new Directory<string>()
      expect(dir).toBeInstanceOf(Directory)
    })
  })

  describe('Member methods', () => {
    describe('generateKey', () => {
      it('returns the given key if it\'s available', () => {
        const dir = new Directory<string>()
        expect(dir.generateKey(key)).toBe(key)
      })

      it('adds a unique string if it isn\'t available', () => {
        const dir = new Directory<string>()
        dir.add(key, val)
        expect(dir.generateKey(key)).not.toBe(key)
        expect(dir.generateKey(key).startsWith(key)).toBe(true)
      })
    })

    describe('add', () => {
      it('adds a record', () => {
        const dir = new Directory<string>()
        dir.add(key, val)
        expect(dir.get(key)).toBe(val)
      })

      it('returns the key used', () => {
        const dir = new Directory<string>()
        expect(dir.add(key, val)).toBe(key)
      })
    })

    describe('get', () => {
      it('returns a record', () => {
        const dir = new Directory<string>()
        dir.add(key, val)
        expect(dir.get(key)).toBe(val)
      })

      it('returns null if the record does not exist', () => {
        const dir = new Directory<string>()
        expect(dir.get(key)).toBeNull()
      })
    })

    describe('remove', () => {
      it('removes a record', () => {
        const dir = new Directory<string>()
        dir.add(key, val)
        dir.remove(key)
        expect(dir.get(key)).toBeNull()
      })
    })

    describe('has', () => {
      it('returns false if no record exists with the given key', () => {
        const dir = new Directory<string>()
        expect(dir.has(key)).toBe(false)
      })

      it('returns true if a record exists with the given key', () => {
        const dir = new Directory<string>()
        dir.add(key, val)
        expect(dir.has(key)).toBe(true)
      })
    })

    describe('keys', () => {
      it('returns an array of the keys in the directory', () => {
        const dir = new Directory<string>()
        dir.add(key, val)
        expect(dir.keys()).toEqual([key])
      })
    })

    describe('values', () => {
      it('returns an array of the values in the directory', () => {
        const dir = new Directory<string>()
        dir.add(key, val)
        expect(dir.values()).toEqual([val])
      })
    })

    describe('size', () => {
      it('returns the number of items in the directory', () => {
        const dir = new Directory<string>()
        dir.add(key, val)
        expect(dir.size()).toBe(1)
      })
    })
  })
})
