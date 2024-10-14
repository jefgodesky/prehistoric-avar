const CARRYING_CAPACITY_FACTOR = 1 / 6 // Trial and error

const calculateCarryingCapacity = (area: number, score: number): number => {
  return Math.floor(area * (score / 100) * CARRYING_CAPACITY_FACTOR)
}

export default calculateCarryingCapacity
