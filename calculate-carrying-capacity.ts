const CARRYING_CAPACITY_FACTOR = 5 // See below for why 5

const calculateCarryingCapacity = (area: number, score: number): number => {
  return Math.floor(area * (score / 100) * CARRYING_CAPACITY_FACTOR)
}

export default calculateCarryingCapacity

/*
 * Azgaar’s sets the total population at 69.2 million. We want to reach a
 * prehistoric population that’s roughly 1/10 of that.
 *
 * Let’s take a look at tropical rainforest. Azgaar says there’s 285,000 square
 * kilometers of tropical rainforest, and tropical rainforest is 80% habitable.
 * Azgaar calculates for that a total population of 11.6 million. So…
 *
 * 11600000 = 285000x * 0.8
 * 14500000 = 285000
 * x = 14500000 / 285000 ≈ 50.9
 *
 * So if we want our numbers to be roughly 1/10 of that, we’ll set x to be 5.
 *
 * 285000 * 5 * 0.8 = 1,140,000
 *
 * So we’d have about one million people in our tropical rainforest, rather
 * than 11 million.
 *
 * Azgaar says that 17% of our total population lives in the tropical
 * rainforest, so if our tropical rainforest population is 1 million, we can
 * estimate our total population:
 *
 * P * 0.17 = 1144000
 * P = 6,729,411
 *
 * Right about where we want it, so the math works out that far, at least.
 */
