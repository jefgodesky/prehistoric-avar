import { sample } from '@std/collections'
import Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'
import getChances from '../get-chances.ts'
import oxford from '../../oxford.ts'
import capitalize from '../../capitalize.ts'

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

const impact = (sim: Simulation, site?: Region | null): Region | null => {
  const region = site ?? getImpactRegion(sim)
  if (!region) { impactSea(sim); return null }
  impactLand(sim)
  impactZone0(region)
  impactZone1(sim, region)
  impactZone2(sim, region)
  return region
}

const impactLand = (sim: Simulation): void => {
  sim.world.reduceHabitability(0.5)
}

const impactSea = (sim: Simulation): void => {
  const coastal = Object.values(sim.world.regions).filter(region => region.tags.includes('coastal'))
  for (const region of coastal) {
    for (const p of region.populations) p.adjustSize(-0.1)
  }
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

const impactZone2 = (sim: Simulation, region: Region): void => {
  const zone2 = getZone2(sim, region)
  for (const region of zone2) {
    region.reduceHabitability(0.25)
    for (const p of region.populations) p.adjustSize(-0.25)
  }
}

const recordFormMeteor = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const mass = (Math.random() * 3) + 1
  const massHu = mass.toFixed(2) + ' trillion kilograms'
  const mithril = (Math.random() * 0.4) + 0.2
  const mithrilPercent = `${(mithril * 100).toFixed(2)}%`
  const mithrilMass = mass * mithril
  const mithrilMassHu = mithrilMass.toFixed(2) + ' trillion kilograms'
  const introductions: string[] = [
    sample(getChances(1, 10)) ?? false ? 'maedor' : '',
    sample(getChances(1, 10)) ?? false ? 'basilisks' : '',
    sample(getChances(1, 10)) ?? false ? 'cockatrices' : '',
  ].filter(critter => critter.length > 0)

  const site = region === null ? null : impact(sim, region)
  let description = site === null
    ? `A chunk of the moon with a mass of ${massHu}` +
      'smashed into the sea. The resulting super-tsunamis that circled the ' +
      'globe wiped out 10% of all populations living along the coasts.'
    : `A chunk of the moon with a mass of ${massHu} smashed into ${site.id}, ` +
      'instantly wiping out all life in the region, devastating the ' +
      'surrounding regions, and reducing habitability worldwide by half. ' +
      `The meteor was ${mithrilPercent} mithril, creating a massive deposit` +
      `of ${mithrilMassHu} of the cured metal in the region.`

  if (site !== null && introductions.length > 0) {
    description += ` The meteor also introduced ${oxford(...introductions)} ` +
      'to the region, somehow descended from creatures that survived the ' +
      'journey through the spheres on a dead, tumbling rock.'
  }

  const tags = ['Meteor impact', 'Moon', 'Sphere of Form', 'Mithril']
  if (site) {
    tags.push(site.id)
    tags.push(...introductions.map(critter => capitalize(critter)))
  }

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  await site.addMarker(`Meteor impact site: Struck by a meteor from the ` +
    `moon in  millennium ${sim.millennium}. It was ${massHu}, resulting in ` +
    'the immediate death of everyone in the region and a 50% reduction in ' +
    'global habitability.')
  await site.addMarker('Massive Mithril Deposit: A meteor strike from ' +
    `millennium ${sim.millennium} left ${mithrilMassHu} of the cured metal in ` +
    'the region.')
  for (const critter of introductions) {
    await site.addMarker(`${capitalize(critter)}: The region is home to a ` +
      `population of ${critter}, descended from creatures that somehow ` +
      'survived the journey from the moon through the spheres on a meteor ' +
      `that fell here in millennium ${sim.millennium}.`)
  }
}

const recordOrderMeteorRock = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const mass = (Math.random() * 3) + 1
  const massHu = mass.toFixed(2) + ' trillion kilograms'
  const aegan = (Math.random() * 0.4) + 0.2
  const aeganPercent = `${(aegan * 100).toFixed(2)}%`
  const aeganMass = mass * aegan
  const aeganMassHu = aeganMass.toFixed(2) + ' trillion kilograms'

  const site = region === null ? null : impact(sim, region)
  let description = site === null
    ? `A chunk of Hadar with a mass of ${massHu}` +
    'smashed into the sea. The resulting super-tsunamis that circled the ' +
    'globe wiped out 10% of all populations living along the coasts.'
    : `A chunk of Hadar with a mass of ${massHu} smashed into ${site.id}, ` +
    'instantly wiping out all life in the region, devastating the ' +
    'surrounding regions, and reducing habitability worldwide by half. ' +
    `The meteor was ${aeganPercent} aegan, creating a massive deposit` +
    `of ${aeganMassHu} of the cured metal in the region.`

  const tags = ['Meteor impact', 'Hadar', 'Sphere of Order', 'Aegan']
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  await site.addMarker(`Meteor impact site: Struck by a meteor from Hadar ` +
    `in  millennium ${sim.millennium}. It was ${massHu}, resulting in ` +
    'the immediate death of everyone in the region and a 50% reduction in ' +
    'global habitability.')
  await site.addMarker('Massive Aegan Deposit: A meteor strike from ' +
    `millennium ${sim.millennium} left ${aeganMassHu} of the cured metal in ` +
    'the region.')
}

export {
  getImpactRegion,
  getZone1,
  getZone2,
  impact,
  impactLand,
  impactSea,
  impactZone0,
  impactZone1,
  impactZone2,
  recordFormMeteor,
  recordOrderMeteorRock
}
