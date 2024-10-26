import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IImmortal } from '../index.d.ts'
import { DISPOSITIONS } from '../enums.ts'
import Immortal from './Immortal.ts'

describe('Immortal', () => {
  const data: IImmortal = {
    description: 'The Dragon Queen',
    disposition: DISPOSITIONS.HOSTILE,
    impact: 1000,
    relationships: [
      {
        a: 'Immortal: The Dragon Queen',
        b: 'Population: GS03-001WO',
        disposition: DISPOSITIONS.HOSTILE,
        scrolls: []
      }
    ],
    scrolls: [
      {
        text: 'The Dragon Queen finds a consort',
        seals: 4
      }
    ],
    slayable: [1000000, 500000]
  }

  describe('constructor', () => {
    it('creates an Immortal instance', () => {
      const i = new Immortal()
      expect(i).toBeInstanceOf(Immortal)
    })

    it('defaults description to a null string', () => {
      const i = new Immortal()
      expect(i.description).toBe('')
    })

    it('defaults disposition to indifferent', () => {
      const i = new Immortal()
      expect(i.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    })

    it('defaults impact to 0', () => {
      const i = new Immortal()
      expect(i.impact).toBe(0)
    })

    it('defaults relationships to an empty array', () => {
      const i = new Immortal()
      expect(i.relationships).toHaveLength(0)
    })

    it('defaults scrolls to an empty array', () => {
      const i = new Immortal()
      expect(i.scrolls).toHaveLength(0)
    })

    it('defaults slayable to false', () => {
      const i = new Immortal()
      expect(i.slayable).toBe(false)
    })

    it('can set description', () => {
      const i = new Immortal(data)
      expect(i.description).toBe(data.description)
    })

    it('can set disposition', () => {
      const i = new Immortal(data)
      expect(i.disposition).toBe(data.disposition)
    })

    it('can set impact', () => {
      const i = new Immortal(data)
      expect(i.impact).toBe(data.impact)
    })

    it('can set relationships', () => {
      const i = new Immortal(data)
      expect(i.relationships).toHaveLength(data.relationships.length)
    })

    it('can set scrolls', () => {
      const i = new Immortal(data)
      expect(i.scrolls).toHaveLength(data.scrolls.length)
    })

    it('can set slayable', () => {
      const i = new Immortal(data)
      expect(i.slayable).toEqual([1000000, 500000])
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const i = new Immortal(data)
        expect(JSON.stringify(i.toObject())).toBe(JSON.stringify(data))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const i = new Immortal(data)
        expect(i.toString()).toBe(`Immortal: ${data.description}`)
      })
    })
  })
})
