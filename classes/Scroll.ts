import { nanoid } from 'nanoid'
import { IScroll } from '../index.d.ts'

const defaultScrollOnUnseal = (): number => 1
const defaultScrollOnOpen = (): void => { return }

class Scroll {
  id: string
  text: string
  seals: number
  onUnseal: () => number
  onOpen: () => void

  constructor (text?: string, seals?: number, onUnseal?: () => number, onOpen?: () => void) {
    this.id = nanoid()
    this.text = text ?? ''
    this.seals = seals ?? 1
    this.onUnseal = onUnseal ?? defaultScrollOnUnseal
    this.onOpen = onOpen ?? defaultScrollOnOpen
  }

  unseal (): boolean {
    this.seals = Math.max(0, this.seals - this.onUnseal())
    const opened = this.seals === 0
    if (opened) this.open()
    return opened
  }

  open(): void {
    this.seals = 0
    this.onOpen()
  }

  toObject (): IScroll {
    return {
      id: this.id,
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
