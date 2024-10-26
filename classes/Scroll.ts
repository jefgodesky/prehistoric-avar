import { IScroll, IWorld } from '../index.d.ts'

const defaultScrollOnUnseal = (): number => 1
const defaultScrollOnOpen = (): void => { return }

class Scroll {
  text: string
  seals: number
  onUnseal: (context?: IWorld) => number
  onOpen: (context?: IWorld) => void

  constructor (text?: string, seals?: number, onUnseal?: (context?: IWorld) => number, onOpen?: (context?: IWorld) => void) {
    this.text = text ?? ''
    this.seals = seals ?? 1
    this.onUnseal = onUnseal ?? defaultScrollOnUnseal
    this.onOpen = onOpen ?? defaultScrollOnOpen
  }

  unseal (context?: IWorld): boolean {
    this.seals = Math.max(0, this.seals - this.onUnseal(context))
    const opened = this.seals === 0
    if (opened) this.open(context)
    return opened
  }

  open(context?: IWorld): void {
    this.seals = 0
    this.onOpen(context)
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
export { defaultScrollOnUnseal, defaultScrollOnOpen }
