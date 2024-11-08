import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SampleSociety } from '../test-examples.ts'
import Simulation from './Simulation.ts'
import Society from './Society.ts'
import Language from './Language.ts'

describe('Language', () => {
  const sim = new Simulation()
  const region = sim.world.regions['GS03']
  const society = new Society(region, SampleSociety)

  describe('constructor', () => {
    it('creates a Language instance', () => {
      const lang = new Language(society)
      expect(lang).toBeInstanceOf(Language)
    })

    it('generates a name', () => {
      const lang = new Language(society)
      expect(lang.name).toBe('GS03-001')
    })

    it('can have a name', () => {
      const name = 'FS32-001'
      const lang = new Language(society, { name })
      expect(lang.name).toBe(name)
    })

    it('defaults to no ancestor', () => {
      const lang = new Language(society)
      expect(lang.ancestor).not.toBeDefined()
    })

    it('can have an ancestor', () => {
      const name = 'FS32-003'
      const ancestor = 'FS32-002'
      const lang = new Language(society, { name, ancestor })
      expect(lang.ancestor).toBe(ancestor)
    })
  })

  describe('Member methods', () => {
    describe('generateName', () => {
      it('generates a name for the language', () => {
        const expected = 'GS03-001'
        const lang = new Language(society)
        expect(lang.generateName()).toBe(expected)
      })
    })

    describe('toObject', () => {
      it('returns an object', () => {
        const lang = new Language(society)
        const obj = lang.toObject()
        expect(obj.name).toEqual(lang.name)
        expect(obj.ancestor).toEqual(lang.ancestor)
      })
    })

    describe('toString', () => {
      it('returns a string', () => {
        const name = 'FS32-001'
        const lang = new Language(society, { name })
        expect(lang.toString()).toEqual(`Language: ${name}`)
      })
    })
  })
})
