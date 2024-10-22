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
}

export default World
