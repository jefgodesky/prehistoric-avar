import { nanoid } from 'nanoid'
import { DISPOSITIONS } from '../../enums.ts'
import Immortal from '../../classes/immortals/Immortal.ts'
import Quest from '../../classes/Quest.ts'
import Simulation from '../../classes/Simulation.ts'

const desiredFireElementalRegions = (sim: Simulation): string[] => {
  return sim.world.regions.values()
    .filter(region => {
      const volcanicFeatures = ['Volcano', 'Volcanic pipe']
      const isVolcanic = region.features.map(feature => feature.description).some(feature => volcanicFeatures.includes(feature))
      const hasFlameDragons = region.dragons.includes('flame dragon')
      return isVolcanic || hasFlameDragons
    })
    .map(region => region.id)
}

const desiredAirElementalRegions = (sim: Simulation): string[] => {
  return sim.world.regions.values()
    .filter(region => {
      const isMountainous = region.tags.includes('mountains')
      const isGrassland = region.tags.includes('grassland')
      const hasFrostDragons = region.dragons.includes('frost dragon')
      return isMountainous || isGrassland || hasFrostDragons
    })
    .map(region => region.id)
}

const desiredWaterElementalRegions = (sim: Simulation): string[] => {
  return sim.world.regions.values()
    .filter(region => {
      const isCoastal = region.tags.includes('coastal')
      const hasStormDragons = region.dragons.includes('storm dragon')
      return isCoastal || hasStormDragons
    })
    .map(region => region.id)
}

const desiredEarthElementalRegions = (sim: Simulation): string[] => {
  return sim.world.regions.values()
    .filter(region => {
      const isCave = region.tags.includes('cave')
      const hasForestDragons = region.dragons.includes('forest dragon')
      return isCave || hasForestDragons
    })
    .map(region => region.id)
}

const desiredElementalRegions = (sim: Simulation, element: string): string[] => {
  switch (element) {
    case 'fire': return desiredFireElementalRegions(sim)
    case 'air': return desiredAirElementalRegions(sim)
    case 'water': return desiredWaterElementalRegions(sim)
    case 'earth': return desiredEarthElementalRegions(sim)
    default: return []
  }
}

const createElemental = (sim: Simulation, element: string): Immortal => {
  const elements = ['fire', 'air', 'water', 'earth', 'aether']
  const el = elements.includes(element) ? element : 'aether'
  let description
  switch (el) {
    case 'fire': description = 'Powerful Fire Elemental'; break
    case 'air': description = 'Powerful Air Elemental'; break
    case 'water': description = 'Powerful Water Elemental'; break
    case 'earth': description = 'Powerful Earth Elemental'; break
    default: description = 'Powerful Aether Elemental'; break
  }

  return new Immortal(
    sim,
    {
      description,
      disposition: DISPOSITIONS.INDIFFERENT,
      impact: 250,
      slayable: new Quest(sim, {
        id: nanoid(),
        description: `Slay the Powerful ${el} Elemental`,
        courage: 0.001,
        skill: 0.0001,
        lethality: 0.25
      }),
      relationships: [],
      scrolls: [],
    }
  )

  /*elemental.move = (sim: Simulation, current: Region): Region | null => {
    if (el === 'aether') return null
    const desiredRegions = desiredElementalRegions(sim, el)
    if (desiredRegions.includes(current.id)) return null
    const desiredAdjacentIds = intersect(desiredRegions, current.adjacentRegions)
    const choices = desiredAdjacentIds.length > 0 ? desiredAdjacentIds : current.adjacentRegions
    const id = sample(choices)
    return id ? sim.world.regions.get(id) : null
  }*/
}

export default createElemental
export { desiredElementalRegions }
