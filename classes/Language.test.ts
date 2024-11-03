import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { LANG_MORPHOLOGY, LANG_ORDER } from '../enums.ts'
import { SamplePopulation } from '../test-examples.ts'
import Population from './Population.ts'
import Simulation from './Simulation.ts'
import Language, { INFLUENCE_NEEDED } from './Language.ts'

describe('Language', () => {
  const sim = new Simulation()
  const region = sim.world.regions['GS03']

  describe('constructor', () => {
    it('creates a Language instance', () => {
      const lang = new Language(region)
      expect(lang).toBeInstanceOf(Language)
    })

    it('generates a name', () => {
      const lang = new Language(region)
      expect(lang.name).toBe('GS03-001')
    })

    it('can have a name', () => {
      const name = 'FS32-001'
      const lang = new Language(region, { name })
      expect(lang.name).toBe(name)
    })

    it('defaults to SOV', () => {
      const lang = new Language(region)
      expect(lang.order).toBe(LANG_ORDER.SOV)
    })

    it('can be SVO', () => {
      const order = LANG_ORDER.SVO
      const lang = new Language(region, { order })
      expect(lang.order).toBe(order)
    })

    it('can be OSV', () => {
      const order = LANG_ORDER.OSV
      const lang = new Language(region, { order })
      expect(lang.order).toBe(order)
    })

    it('can be OVS', () => {
      const order = LANG_ORDER.OVS
      const lang = new Language(region, { order })
      expect(lang.order).toBe(order)
    })

    it('can be VSO', () => {
      const order = LANG_ORDER.VSO
      const lang = new Language(region, { order })
      expect(lang.order).toBe(order)
    })

    it('can be VOS', () => {
      const order = LANG_ORDER.VOS
      const lang = new Language(region, { order })
      expect(lang.order).toBe(order)
    })

    it('defaults to fusional', () => {
      const lang = new Language(region)
      expect(lang.morphology).toBe(LANG_MORPHOLOGY.FUSIONAL)
    })

    it('can be analytic', () => {
      const morphology = LANG_MORPHOLOGY.ANALYTIC
      const lang = new Language(region, { morphology })
      expect(lang.morphology).toBe(morphology)
    })

    it('can be agglutinative', () => {
      const morphology = LANG_MORPHOLOGY.AGGLUTINATIVE
      const lang = new Language(region, { morphology })
      expect(lang.morphology).toBe(morphology)
    })

    it('sets up a blank influence chart', () => {
      const lang = new Language(region)
      expect(lang.influences.order.SVO).toBe(0)
    })
  })

  describe('Member methods', () => {
    describe('generateName', () => {
      it('generates a name for the language', () => {
        const expected = 'GS03-001'
        const lang = new Language(region)
        expect(lang.generateName()).toBe(expected)
      })
    })

    describe('advanceMorphology', () => {
      it('advances from fusional to analytic', () => {
        const lang = new Language(region)
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.ANALYTIC)
      })

      it('advances from analytic to agglutinative', () => {
        const lang = new Language(region, { morphology: LANG_MORPHOLOGY.ANALYTIC })
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.AGGLUTINATIVE)
      })

      it('advances from agglutinative to fusional', () => {
        const lang = new Language(region, { morphology: LANG_MORPHOLOGY.AGGLUTINATIVE })
        lang.advanceMorphology()
        expect(lang.morphology).toBe(LANG_MORPHOLOGY.FUSIONAL)
      })
    })

    describe('advanceOrder', () => {
      it('usually advances SOV to SVO', () => {
        const lang = new Language(region, { order: LANG_ORDER.SOV })
        expect(lang.advanceOrder(14)).toBe(LANG_ORDER.SVO)
      })

      it('rarely advances SOV to OSV', () => {
        const lang = new Language(region, { order: LANG_ORDER.SOV })
        expect(lang.advanceOrder(4)).toBe(LANG_ORDER.OSV)
      })

      it('rarely advances SOV to OVS', () => {
        const lang = new Language(region, { order: LANG_ORDER.SOV })
        expect(lang.advanceOrder(24)).toBe(LANG_ORDER.OVS)
      })

      it('never advances OSV', () => {
        const lang = new Language(region, { order: LANG_ORDER.OSV })
        expect(lang.advanceOrder()).toBe(LANG_ORDER.OSV)
      })

      it('never advances OVS', () => {
        const lang = new Language(region, { order: LANG_ORDER.OVS })
        expect(lang.advanceOrder()).toBe(LANG_ORDER.OVS)
      })

      it('usually advances SVO to VSO', () => {
        const lang = new Language(region, { order: LANG_ORDER.SVO })
        expect(lang.advanceOrder(10)).toBe(LANG_ORDER.VSO)
      })

      it('rarely advances SVO to VOS', () => {
        const lang = new Language(region, { order: LANG_ORDER.SVO })
        expect(lang.advanceOrder(20)).toBe(LANG_ORDER.VOS)
      })

      it('sometimes advances VSO to SVO', () => {
        const lang = new Language(region, { order: LANG_ORDER.VSO })
        expect(lang.advanceOrder(5)).toBe(LANG_ORDER.SVO)
      })

      it('sometimes advances VSO to VOS', () => {
        const lang = new Language(region, { order: LANG_ORDER.VSO })
        expect(lang.advanceOrder(15)).toBe(LANG_ORDER.VOS)
      })

      it('sometimes advances VOS to SVO', () => {
        const lang = new Language(region, { order: LANG_ORDER.VOS })
        expect(lang.advanceOrder(5)).toBe(LANG_ORDER.SVO)
      })

      it('sometimes advances VOS to VSO', () => {
        const lang = new Language(region, { order: LANG_ORDER.VOS })
        expect(lang.advanceOrder(15)).toBe(LANG_ORDER.VSO)
      })
    })

    describe('gatherDiffusion', () => {
      it('calculates influences from neighboring languages', () => {
        sim.world.regions['GS02'].languages.push( new Language(sim.world.regions['GS02'], { order: LANG_ORDER.SVO }))
        region.introduce(new Population(sim.emitter, region, SamplePopulation))
        const lang = new Language(region)
        const diffusion = lang.gatherDiffusion()
        expect(diffusion.order.SVO).toBe(1)
      })
    })

    describe('applyInfluence', () => {
      beforeEach(() => {
        sim.world.regions['GS02'].languages = [new Language(sim.world.regions['GS02'], { order: LANG_ORDER.SVO })]
        region.introduce(new Population(sim.emitter, region, SamplePopulation))
      })

      it('adds influence based on generation and diffusion', () => {
        const lang = new Language(region)
        const { order, morphology } = lang.applyInfluence()
        expect(lang.influences.order.SVO).toBe(40)
        expect(lang.influences.order.VSO).toBe(0)
        expect(order).toBe(lang.order)
        expect(morphology).toBe(lang.morphology)
      })

      it('returns order if influence exceeds threshold', () => {
        const lang = new Language(region)
        const generation = region.populations[0].species.generation ?? 50
        lang.influences.order.SVO = INFLUENCE_NEEDED - 5
        const { order, morphology } = lang.applyInfluence()
        expect(lang.influences.order.SVO).toBe(INFLUENCE_NEEDED + generation - 5)
        expect(lang.influences.order.VSO).toBe(0)
        expect(order).toBe(LANG_ORDER.SVO)
        expect(morphology).toBe(lang.morphology)
      })

      it('returns morphology if influence exceeds threshold', () => {
        const lang = new Language(region)
        lang.influences.morphology.Agglutinative = INFLUENCE_NEEDED + 20
        const { order, morphology } = lang.applyInfluence()
        expect(order).toBe(lang.order)
        expect(morphology).toBe(LANG_MORPHOLOGY.AGGLUTINATIVE)
      })

      it('returns the most influential order if more than one exceed threshold', () => {
        const lang = new Language(region)
        lang.influences.order.SVO = INFLUENCE_NEEDED + 50
        lang.influences.order.VSO = INFLUENCE_NEEDED + 20
        const { order, morphology } = lang.applyInfluence()
        expect(order).toBe(LANG_ORDER.SVO)
        expect(morphology).toBe(lang.morphology)
      })

      it('returns the most influential morphology if more than one exceed threshold', () => {
        const lang = new Language(region)
        lang.influences.morphology.Agglutinative = INFLUENCE_NEEDED + 50
        lang.influences.morphology.Analytic = INFLUENCE_NEEDED + 20
        const { order, morphology } = lang.applyInfluence()
        expect(order).toBe(lang.order)
        expect(morphology).toBe(LANG_MORPHOLOGY.AGGLUTINATIVE)
      })

      it('picks an order randomly in case of a tie', () => {
        const lang = new Language(region)
        lang.influences.order.SVO = INFLUENCE_NEEDED + 50
        lang.influences.order.VSO = INFLUENCE_NEEDED + 50
        const expected = [
          LANG_ORDER.SVO,
          LANG_ORDER.VSO
        ]
        const { order, morphology } = lang.applyInfluence()
        expect(expected).toContain(order)
        expect(morphology).toBe(lang.morphology)
      })

      it('picks a morphology randomly in case of a tie', () => {
        const lang = new Language(region)
        lang.influences.morphology.Agglutinative = INFLUENCE_NEEDED + 50
        lang.influences.morphology.Analytic = INFLUENCE_NEEDED + 50
        const expected = [
          LANG_MORPHOLOGY.AGGLUTINATIVE,
          LANG_MORPHOLOGY.ANALYTIC
        ]
        const { order, morphology } = lang.applyInfluence()
        expect(order).toBe(lang.order)
        expect(expected).toContain(morphology)
      })
    })

    describe('toObject', () => {
      it('returns an object', () => {
        const lang = new Language(region)
        const obj = lang.toObject()
        expect(obj.name).toEqual(lang.name)
        expect(obj.order).toEqual(lang.order)
        expect(obj.morphology).toEqual(lang.morphology)
      })
    })

    describe('toString', () => {
      it('returns a string', () => {
        const name = 'FS32-001'
        const lang = new Language(region, { name })
        expect(lang.toString()).toEqual(`Language: ${name}`)
      })
    })
  })

  describe('Static methods', () => {
    describe('willNaturallyAdvance', () => {
      const { morphology, order } = Language.willNaturallyAdvance()
      expect(morphology).toBeDefined()
      expect(order).toBeDefined()
    })

    describe('willNaturallyAdvanceMorphology', () => {
      it('returns a boolean answer', () => {
        expect(Language.willNaturallyAdvanceMorphology()).toBeDefined()
      })
    })

    describe('willNaturallyAdvanceOrder', () => {
      it('returns a boolean answer', () => {
        expect(Language.willNaturallyAdvanceOrder()).toBeDefined()
      })
    })
  })
})
