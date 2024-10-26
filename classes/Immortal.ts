import { IImmortal } from '../index.d.ts'
import { Disposition, DISPOSITIONS } from '../enums.ts'
import Scroll from './Scroll.ts'

class Immortal {
  description: string
  disposition: Disposition
  impact: number
  scrolls: Scroll[]
  slayable: [number, number] | false

  constructor (data?: IImmortal) {
    this.description = data?.description ?? ''
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
    this.impact = data?.impact ?? 0
    this.scrolls = data?.scrolls
      ? data.scrolls.map(d => new Scroll(d.text, d.seals))
      : []
    this.slayable = data?.slayable ?? false
  }

  toObject (): IImmortal {
    return {
      description: this.description,
      disposition: this.disposition,
      impact: this.impact,
      scrolls: this.scrolls.map(scroll => scroll.toObject()),
      slayable: this.slayable
    }
  }

  toString (): string {
    return `Immortal: ${this.description}`
  }
}

export default Immortal
