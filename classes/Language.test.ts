import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { LANG_MORPHOLOGY, LANG_ORDER } from '../enums.ts'
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
      expect(lang.order).toBe(LANG_ORDER.SOV)
    })

    it('can be SVO', () => {
      const order = LANG_ORDER.SVO
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('can be OSV', () => {
      const order = LANG_ORDER.OSV
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('can be OVS', () => {
      const order = LANG_ORDER.OVS
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('can be VSO', () => {
      const order = LANG_ORDER.VSO
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('can be VOS', () => {
      const order = LANG_ORDER.VOS
      const lang = new Language({ order })
      expect(lang.order).toBe(order)
    })

    it('defaults to fusional', () => {
      const lang = new Language()
      expect(lang.morphology).toBe(LANG_MORPHOLOGY.FUSIONAL)
    })

    it('can be analytic', () => {
      const morphology = LANG_MORPHOLOGY.ANALYTIC
      const lang = new Language({ morphology })
      expect(lang.morphology).toBe(morphology)
    })

    it('can be agglutinative', () => {
      const morphology = LANG_MORPHOLOGY.AGGLUTINATIVE
      const lang = new Language({ morphology })
      expect(lang.morphology).toBe(morphology)
    })
  })

  describe('Member methods', () => {
    describe('advanceMorpology', () => {
      it('advances from fusional to analytic', () => {
        const lang = new Language()
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.ANALYTIC)
      })

      it('advances from analytic to agglutinative', () => {
        const lang = new Language({morphology: LANG_MORPHOLOGY.ANALYTIC})
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.AGGLUTINATIVE)
      })

      it('advances from agglutinative to fusional', () => {
        const lang = new Language({morphology: LANG_MORPHOLOGY.AGGLUTINATIVE})
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.FUSIONAL)
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
})
