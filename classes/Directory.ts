import { customAlphabet } from 'nanoid'

class Directory<T> {
  private readonly records: Record<string, T>

  constructor () {
    this.records = {}
  }

  generateKey (key: string): string {
    let unique = key
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = upper.toUpperCase()
    const numerals = '0123456789'
    const nanoid = customAlphabet(upper + lower + numerals, 6)
    while (unique in this.records) {
      unique = `${key} (${nanoid()})`
    }
    return unique
  }

  add (key: string, value: T): string {
    const actualKey = this.generateKey(key)
    this.records[actualKey] = value
    return actualKey
  }

  get (key: string): T | null {
    return this.records[key] ?? null
  }

  remove (key: string): void {
    if (!this.records[key]) return
    delete this.records[key]
  }

  has (key: string): boolean {
    return key in this.records
  }

  keys (): string[] {
    return Object.keys(this.records)
  }

  values (): T[] {
    return Object.values(this.records)
  }

  size (): number {
    return this.keys().length
  }
}

export default Directory
