import Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'

const getImpactRegion = (sim: Simulation): Region | null => {
  const totalArea = 4 * Math.PI * Math.pow(5000, 2)
  const impact = Math.random() * totalArea
  const regions = Object.values(sim.world.regions).filter(region => region.tags.includes('surface'))
  let acc = 0
  for (const region of regions) {
    acc += region.area
    if (impact <= acc) return region
  }
  return null
}

const getZone1 = (sim: Simulation, region: Region): Region[] => {
  return region.adjacentRegions.map(id => sim.world.regions[id])
}

export {
  getImpactRegion,
  getZone1,
}
