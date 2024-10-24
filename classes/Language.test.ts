import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Language from './Language.ts'

describe('Language', () => {
  describe('constructor', () => {
    it('creates a Language instance', () => {
      const lang = new Language()
      expect(lang).toBeInstanceOf(Language)
    })

    it('can have a name', () => {
      const name = 'FS32-001'
      const lang = new Language({ name })
      expect(lang.name).toBe(name)
    })

    it('defaults to SOV', () => {
      const lang = new Language()
      expect(lang.order).toBe('SOV')
    })

    it('can be SVO', () => {
      const order = 'SVO'
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('can be OSV', () => {
      const order = 'OSV'
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('can be OVS', () => {
      const order = 'OVS'
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('can be VSO', () => {
      const order = 'VSO'
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('can be VOS', () => {
      const order = 'VOS'
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('defaults to fusional', () => {
      const lang = new Language()
      expect(lang.morphology).toBe('Fusional')
    })

    it('can be analytic', () => {
      const morphology = 'Analytic'
      const lang = new Language({ morphology })
      expect(lang.morphology).toBe(morphology)
    })

    it('can be agglutinative', () => {
      const morphology = 'Agglutinative'
      const lang = new Language({ morphology })
      expect(lang.morphology).toBe(morphology)
    })
  })

  describe('advanceMorpology', () => {
    it('advances from fusional to analytic', () => {
      const lang = new Language()
      lang.advanceMorphology()
      expect(lang.morphology).toBe('Analytic')
    })

    it('advances from analytic to agglutinative', () => {
      const lang = new Language({ morphology: 'Analytic' })
      lang.advanceMorphology()
      expect(lang.morphology).toBe('Agglutinative')
    })

    it('advances from agglutinative to fusional', () => {
      const lang = new Language({ morphology: 'Agglutinative' })
      lang.advanceMorphology()
      expect(lang.morphology).toBe('Fusional')
    })
  })

  describe('toObject', () => {
    it('returns an object', () => {
      const lang = new Language()
      const obj = lang.toObject()
      expect(obj.name).toEqual(lang.name)
      expect(obj.order).toEqual(lang.order)
      expect(obj.morphology).toEqual(lang.morphology)
    })
  })
})
