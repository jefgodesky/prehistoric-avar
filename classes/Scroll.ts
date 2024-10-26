import { IScroll, IWorld } from '../index.d.ts'

class Scroll {
  text: string
  seals: number
  fn: (context?: IWorld) => number

  constructor (text?: string, seals?: number, fn?: (context?: IWorld) => number) {
    const defaultFn = (): number => 1
    this.text = text ?? ''
    this.seals = seals ?? 1
    this.fn = fn ?? defaultFn
  }

  unseal (context?: IWorld): boolean {
    this.seals = Math.max(0, this.seals - this.fn(context))
    return this.seals === 0
  }

  toObject (): IScroll {
    return {
      text: this.text,
      seals: this.seals
    }
  }

  toString (): string {
    return `Scroll: ${this.text} [${this.seals}]`
  }
}

export default Scroll
