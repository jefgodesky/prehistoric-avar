import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import History from './History.ts'

describe('History', () => {
  const event = { millennium: 1, description: 'Wosan discover fire', tags: ['GS03', 'Wosan', 'invention'] }

  describe('constructor', () => {
    it('creates a History instance', () => {
      const history = new History()
      expect(history).toBeInstanceOf(History)
    })

    it('defaults to an empty list of events', () => {
      const history = new History()
      expect(history.events).toHaveLength(0)
    })

    it('can take a set of historical events', () => {
      const history = new History([event])
      expect(history.events).toHaveLength(1)
    })
  })

  describe('Member methods', () => {
    describe('add', () => {
      it('adds an event', () => {
        const history = new History()
        history.add(event)
        expect(history.events).toHaveLength(1)
      })
    })

    describe('get', () => {
      it('returns all events if not given any filters', () => {
        const history = new History([event])
        expect(history.get()).toHaveLength(1)
      })

      it('returns events from the millennium specified', () => {
        const history = new History([event])
        expect(history.get({ millennium: 1 })).toHaveLength(1)
      })

      it('doesn\'t return events from other millennia', () => {
        const history = new History([event])
        expect(history.get({ millennium: 2 })).toHaveLength(0)
      })

      it('returns events with the tags specified', () => {
        const history = new History([event])
        expect(history.get({ tags: ['GS03'] })).toHaveLength(1)
      })

      it('doesn\'t return events without the tags specified', () => {
        const history = new History([event])
        expect(history.get({ tags: ['GS02'] })).toHaveLength(0)
      })

      it('returns events that match all tags', () => {
        const history = new History([event])
        expect(history.get({ tags: ['GS03', 'Wosan'], logic: { tags: 'and' }})).toHaveLength(1)
      })

      it('filters out events that don\'t match all tags', () => {
        const history = new History([event])
        expect(history.get({ tags: ['GS03', 'Human'], logic: { tags: 'and' }})).toHaveLength(0)
      })

      it('returns events that match a tag but not millennium', () => {
        const history = new History([event])
        expect(history.get({ tags: ['GS03', 'Wosan'], millennium: 2 })).toHaveLength(1)
      })

      it('returns events that match millennium but no tags', () => {
        const history = new History([event])
        expect(history.get({ tags: ['DS01'], millennium: 2 })).toHaveLength(0)
      })

      it('returns events that match a tag and the millennium', () => {
        const history = new History([event])
        expect(history.get({ tags: ['GS03'], millennium: 1 })).toHaveLength(1)
      })

      it('respects and logic over the whole query', () => {
        const history = new History([event])
        expect(history.get({ tags: ['DS01'], millennium: 2, logic: { query: 'and' } })).toHaveLength(0)
      })

      it('can combine and logic for the query with or logic for the tags', () => {
        const history = new History([event])
        expect(history.get({ tags: ['GS03', 'Human'], millennium: 1, logic: { tags: 'or', query: 'and' } })).toHaveLength(1)
      })
    })

    describe('toObject', () => {
      it('returns an object', () => {
        const history = new History([event])
        expect(JSON.stringify(history.toObject())).toBe(JSON.stringify([event]))
      })
    })

    describe('toString', () => {
      it('returns "History" if it has no events', () => {
        const history = new History()
        expect(history.toString()).toBe('History')
      })

      it('returns start date if only events from a single millennium', () => {
        const history = new History([event, event])
        expect(history.toString()).toBe('History (1,000 BP)')
      })

      it('returns start and end years for a span', () => {
        const e2 = Object.assign({}, event, { millennium: 20 })
        const history = new History([event, e2])
        expect(history.toString()).toBe('History (20,000 - 1,000 BP)')
      })
    })
  })
})
