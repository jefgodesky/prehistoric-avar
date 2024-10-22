const ROUND_HABITABILITY_TO_FULL = 0.95

class World {
  habitability: number
  events: string[]
  dragons: {
    interest: number
    fear: number
  }

  constructor() {
    this.habitability = 1
    this.events = []
    this.dragons = {
      interest: 0,
      fear: 0
    }
  }

  incrDraconicInterest(): void {
    this.dragons.interest++
  }

  decrDraconicInterest(): void {
    const { interest } = this.dragons
    this.dragons.interest = Math.max(interest - 1, 0)
  }

  incrDraconicFear(): void {
    this.dragons.fear++
  }

  decrDraconicFear(): void {
    const { fear } = this.dragons
    this.dragons.fear = Math.max(fear - 1, 0)
  }

  reduceHabitability(factor: number): void {
    this.habitability *= factor
  }

  restoreHabitability(): void {
    const gap = 1 - this.habitability
    this.habitability += gap / 2
    if (this.habitability >= ROUND_HABITABILITY_TO_FULL) this.habitability = 1
  }
}

export default World
