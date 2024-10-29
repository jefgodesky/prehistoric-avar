class DragonScore {
  value: number

  constructor (value: number = 0) {
    this.value = value
  }

  incr (): number {
    return this.mod(1)
  }

  decr (): number {
    return this.mod(-1)
  }

  private mod (modifier: number): number {
    this.value += modifier
    return this.value
  }
}

export default DragonScore
