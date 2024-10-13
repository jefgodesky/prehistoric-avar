const CARRYING_CAPACITY_FACTOR = 13 // See below for why 13

const calculateCarryingCapacity = (area: number, score: number): number => {
  return area * (score / 100) * CARRYING_CAPACITY_FACTOR
}

export default calculateCarryingCapacity

/*
 * Azgaar’s tells us we have a total land area of 1.6 million square
 * kilometers. The reachable land is most of that, but not all of that.
 *
 * Azgaar’s sets the total population at 69 million. We want to reach a
 * prehistoric population that’s roughly 1/10 of that.
 *
 * Let’s take a look at tropical rainforest. Azgaar says there’s 110,000 square
 * kilometers of tropical rainforest, and tropical rainforest is 80% habitable.
 * Azgaar calculates for that a total population of 11.6 million. So…
 *
 * 11600000 = 110000x * 0.8
 * 14500000 = 110000x
 * x = 131.818181818
 *
 * So if we want our numbers to be roughly 1/10 of that, we’ll set x to be 13.
 *
 * 110000 * 13 * 0.8 = 1,144,000
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
