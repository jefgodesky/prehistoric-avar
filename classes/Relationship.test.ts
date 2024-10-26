import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../enums.ts'
import type { IRelationship } from '../index.d.ts'
import Relationship from './Relationship.ts'

describe('Relationship', () => {
  const data: IRelationship = {
    a: 'Population: GS03-001WO',
    b: 'Immortal: The Dragon Queen',
    disposition: DISPOSITIONS.HOSTILE,
    scrolls: [
      {
        text: 'We will come to worship the Dragon Queen',
        seals: 10
      },
      {
        text: 'We will invent gods to protect us from the Dragon Queen',
        seals: 10
      }
    ]
  }

  describe('constructor', () => {
    it('creates a Relationship instance', () => {
      const rel = new Relationship()
      expect(rel).toBeInstanceOf(Relationship)
    })

    it('defaults A to a null string', () => {
      const rel = new Relationship()
      expect(rel.a).toBe('')
    })

    it('defaults B to a null string', () => {
      const rel = new Relationship()
      expect(rel.b).toBe('')
    })

    it('defaults disposition to indifference', () => {
      const rel = new Relationship()
      expect(rel.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    })

    it('defaults scrolls to an empty list', () => {
      const rel = new Relationship()
      expect(rel.scrolls).toHaveLength(0)
    })

    it('can set A', () => {
      const rel = new Relationship(data)
      expect(rel.a).toBe(data.a)
    })

    it('can set B', () => {
      const rel = new Relationship(data)
      expect(rel.b).toBe(data.b)
    })

    it('can set the disposition', () => {
      const rel = new Relationship(data)
      expect(rel.disposition).toBe(data.disposition)
    })

    it('can set the scrolls', () => {
      const rel = new Relationship(data)
      expect(rel.scrolls).toHaveLength(data.scrolls.length)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const rel = new Relationship(data)
        expect(JSON.stringify(rel.toObject())).toBe(JSON.stringify(data))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const rel = new Relationship(data)
        expect(rel.toString()).toBe(`${data.a} → ${data.b} [${data.disposition}]`)
      })
    })
  })
})
