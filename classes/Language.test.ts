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
    describe('advanceMorphology', () => {
      it('advances from fusional to analytic', () => {
        const lang = new Language()
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.ANALYTIC)
      })

      it('advances from analytic to agglutinative', () => {
        const lang = new Language({ morphology: LANG_MORPHOLOGY.ANALYTIC })
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.AGGLUTINATIVE)
      })

      it('advances from agglutinative to fusional', () => {
        const lang = new Language({ morphology: LANG_MORPHOLOGY.AGGLUTINATIVE })
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.FUSIONAL)
      })
    })

    describe('advanceOrder', () => {
      it('usually advances SOV to SVO', () => {
        const lang = new Language({ order: LANG_ORDER.SOV })
        lang.advanceOrder(14)
        expect(lang.order).toBe(LANG_ORDER.SVO)
      })

      it('rarely advances SOV to OSV', () => {
        const lang = new Language({ order: LANG_ORDER.SOV })
        lang.advanceOrder(4)
        expect(lang.order).toBe(LANG_ORDER.OSV)
      })

      it('rarely advances SOV to OVS', () => {
        const lang = new Language({ order: LANG_ORDER.SOV })
        lang.advanceOrder(24)
        expect(lang.order).toBe(LANG_ORDER.OVS)
      })

      it('never advances OSV', () => {
        const lang = new Language({ order: LANG_ORDER.OSV })
        lang.advanceOrder()
        expect(lang.order).toBe(LANG_ORDER.OSV)
      })

      it('never advances OVS', () => {
        const lang = new Language({ order: LANG_ORDER.OVS })
        lang.advanceOrder()
        expect(lang.order).toBe(LANG_ORDER.OVS)
      })

      it('usually advances SVO to VSO', () => {
        const lang = new Language({ order: LANG_ORDER.SVO })
        lang.advanceOrder(10)
        expect(lang.order).toBe(LANG_ORDER.VSO)
      })

      it('rarely advances SVO to VOS', () => {
        const lang = new Language({ order: LANG_ORDER.SVO })
        lang.advanceOrder(20)
        expect(lang.order).toBe(LANG_ORDER.VOS)
      })

      it('sometimes advances VSO to SVO', () => {
        const lang = new Language({ order: LANG_ORDER.VSO })
        lang.advanceOrder(5)
        expect(lang.order).toBe(LANG_ORDER.SVO)
      })

      it('sometimes advances VSO to VOS', () => {
        const lang = new Language({ order: LANG_ORDER.VSO })
        lang.advanceOrder(15)
        expect(lang.order).toBe(LANG_ORDER.VOS)
      })

      it('sometimes advances VOS to SVO', () => {
        const lang = new Language({ order: LANG_ORDER.VOS })
        lang.advanceOrder(5)
        expect(lang.order).toBe(LANG_ORDER.SVO)
      })

      it('sometimes advances VOS to VSO', () => {
        const lang = new Language({ order: LANG_ORDER.VOS })
        lang.advanceOrder(15)
        expect(lang.order).toBe(LANG_ORDER.VSO)
      })
    })

    describe('willNaturallyAdvanceMorphology', () => {
      it('returns a boolean answer', () => {
        const lang = new Language()
        expect(lang.willNaturallyAdvanceMorphology()).toBeDefined()
      })
    })

    describe('willNaturallyAdvanceOrder', () => {
      it('returns a boolean answer', () => {
        const lang = new Language()
        expect(lang.willNaturallyAdvanceOrder()).toBeDefined()
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

    describe('toString', () => {
      it('returns a string', () => {
        const name = 'FS32-001'
        const lang = new Language({ name })
        expect(lang.toString()).toEqual(`Language: ${name}`)
      })
    })
  })
})
