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

const getZone2 = (sim: Simulation, region: Region): Region[] => {
  const regions: string[] = []
  const zone1 = getZone1(sim, region)
  for (const z1Region of zone1) {
    for (const id of z1Region.adjacentRegions) {
      if (id === region.id) continue
      if (zone1.map(r => r.id).includes(id)) continue
      if (regions.includes(id)) continue
      regions.push(id)
    }
  }
  return regions.map(id => sim.world.regions[id])
}

const impactZone0 = (region: Region): void => {
  region.reduceHabitability(0.9)
  for (const p of region.populations) p.adjustSize(p.size * -1)
}

const impactZone1 = (sim: Simulation, region: Region): void => {
  const zone1 = getZone1(sim, region)
  for (const region of zone1) {
    region.reduceHabitability(0.5)
    for (const p of region.populations) p.adjustSize(-0.5)
  }
}

export {
  getImpactRegion,
  getZone1,
  getZone2,
  impactZone0,
  impactZone1
}
