import { intersect } from '@std/collections'
import type { IHistoricalQuery, IHistoricalRecord } from '../index.d.ts'

class History {
  events: IHistoricalRecord[]

  constructor (events?: IHistoricalRecord[]) {
    this.events = events ?? []
  }

  add (event: IHistoricalRecord) {
    this.events.push(event)
  }

  get (filters?: IHistoricalQuery): IHistoricalRecord[] {
    if (!filters) return this.events
    const { millennium } = filters
    const tags = filters.tags || []
    const tagLogic = filters.logic?.tags ?? 'or'
    const queryLogic = filters.logic?.query ?? 'or'
    return this.events.filter(event => {
      const orTags = tagLogic === 'or' && this.hasAnyInCommon(tags, event.tags)
      const andTags = tagLogic === 'and' && this.isSubsetOf(tags, event.tags)
      const conditions: boolean[] = [event.millennium === millennium, (orTags || andTags)]
      return queryLogic === 'or'
        ? conditions.reduce((acc, curr) => acc || curr, false)
        : conditions.reduce((acc, curr) => acc && curr, true)
    })
  }

  toObject (): IHistoricalRecord[] {
    return this.events
  }

  toString (): string {
    if (this.events.length < 1) return 'History'
    const millennia = this.events.map(e => e.millennium)
    const start = Math.max(...millennia)
    const end = Math.min(...millennia)
    return start === end
      ? `History (${start},000 BP)`
      : `History (${start},000 - ${end},000 BP)`
  }

  private hasAnyInCommon (a: string[], b: string[]): boolean {
    return intersect(a, b).length > 0
  }

  private isSubsetOf (a: string[], b: string[]): boolean {
    const aNotInB = a.filter(str => !b.includes(str))
    return aNotInB.length === 0
  }
}

export default History
