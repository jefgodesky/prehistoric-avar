import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Language, { WORDORDER, MORPHOLOGY } from './Language.ts'

describe('Language', () => {
  describe('constructor', () => {
    it('creates a Language instance', () => {
      const lang = new Language()
      expect(lang).toBeInstanceOf(Language)
    })

    it('defaults to SOV', () => {
      const lang = new Language()
      expect(lang.order).toBe(WORDORDER.SOV)
    })

    it('can be SVO', () => {
      const lang = new Language(WORDORDER.SVO)
      expect(lang.order).toBe(WORDORDER.SVO)
    })

    it('can be OSV', () => {
      const lang = new Language(WORDORDER.OSV)
      expect(lang.order).toBe(WORDORDER.OSV)
    })

    it('can be OVS', () => {
      const lang = new Language(WORDORDER.OVS)
      expect(lang.order).toBe(WORDORDER.OVS)
    })

    it('can be VSO', () => {
      const lang = new Language(WORDORDER.VSO)
      expect(lang.order).toBe(WORDORDER.VSO)
    })

    it('can be VOS', () => {
      const lang = new Language(WORDORDER.VOS)
      expect(lang.order).toBe(WORDORDER.VOS)
    })

    it('defaults to fusional', () => {
      const lang = new Language()
      expect(lang.morphology).toBe(MORPHOLOGY.FUSIONAL)
    })

    it('can be analytic', () => {
      const lang = new Language(WORDORDER.SOV, MORPHOLOGY.ANALYTIC)
      expect(lang.morphology).toBe(MORPHOLOGY.ANALYTIC)
    })

    it('can be agglutinative', () => {
      const lang = new Language(WORDORDER.SOV, MORPHOLOGY.AGGLUTINATIVE)
      expect(lang.morphology).toBe(MORPHOLOGY.AGGLUTINATIVE)
    })
  })
})
