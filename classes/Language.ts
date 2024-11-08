import { ILanguage } from '../index.d.ts'
import Society from './Society.ts'

class Language {
  name: string
  ancestor?: string
  society: Society

  constructor (society: Society, data?: ILanguage) {
    this.society = society
    this.name = data?.name ?? this.generateName()
    this.ancestor = data?.ancestor
  }

  generateName (): string {
    const { id, simulation } = this.society.region
    return `${id}-${simulation.millennium.toString().padStart(3, '0')}`
  }

  toObject (): ILanguage {
    return {
      name: this.name,
      ancestor: this.ancestor
    }
  }

  toString (): string {
    return `Language: ${this.name}`
  }
}

export default Language
