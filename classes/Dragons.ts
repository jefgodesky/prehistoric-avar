import type { IDragons } from '../index.d.ts'
import DragonScore from './DragonScore.ts'

class Dragons {
  interest: DragonScore
  fear: DragonScore

  constructor (interestOrObj?: number | DragonScore | IDragons, fear?: number | DragonScore) {
    if ((interestOrObj as IDragons)?.interest && (interestOrObj as IDragons)?.fear) {
      this.interest = new DragonScore((interestOrObj as IDragons).interest)
      this.fear = new DragonScore((interestOrObj as IDragons).fear)
    } else {
      const interest = interestOrObj
      this.interest = interest instanceof DragonScore ? interest : new DragonScore(interest as number)
      this.fear = fear instanceof DragonScore ? fear : new DragonScore(fear)
    }
  }

  sum (): number {
    return this.interest.value + this.fear.value
  }

  toObject (): IDragons {
    return {
      interest: this.interest.value,
      fear: this.fear.value
    }
  }

  toString (): string {
    return `${this.interest.value}/${this.fear.value}`
  }
}

export default Dragons
