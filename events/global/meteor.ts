import { sample } from '@std/collections'
import { SpeciesPlurals } from '../../enums.ts'
import Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'
import getChances from '../get-chances.ts'
import oxford from '../../oxford.ts'
import capitalize from '../../capitalize.ts'
import createElemental from '../immortals/elemental.ts'

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

const recordOrderMeteor = (sim: Simulation): Promise<void> => {
  if (Math.random() < 0.5) {
    return recordOrderMeteorRock(sim)
  } else {
    return recordOrderMeteorEmpyrean(sim)
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
  const description = site === null
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

const recordOrderMeteorEmpyrean = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const site = region === null ? null : impact(sim, region)
  const alignment = sample(['order', 'chaos']) ?? 'order'
  const description = site === null
    ? `An empyrean formed from Hadar's dedication to ${alignment} was cast ` +
      'out of the Sphere of Order for its failure to uphold those ideals. ' +
      'It was trapped in mortal, humanoid form and sent hurtling to Avar. ' +
      `It impacted the sea with such force that it caused super-tsunamis ` +
      'circle the world, reducing the world\'s coastal populations by 10%. ' +
      'The magic that exiled the empyrean allowed it to survive its journey ' +
      'through the spheres and its cataclysmic impact, but did not grant it ' +
      'the superhuman strength and stamina it would need to swim to shore ' +
      'from where it landed in the middle of the ocean. It drowned shortly ' +
      'following its arrival.'
    : `An empyrean formed from Hadar's dedication to ${alignment} was cast ` +
      'out of the Sphere of Order for its failure to uphold those ideals. ' +
      'It was trapped in mortal, humanoid form and sent hurtling to Avar. ' +
      `It smashed into ${site.id}, where the speed of its impact caused the` +
      'immediate death of all the humanoids living there, devastated the ' +
      'surrounding regions, and reduced worldwide habitability by half. The ' +
      'magic that exiled the empyrean allowed it to survive its journey ' +
      'through the spheres and its cataclysmic impact, allowing it to live ' +
      'out a mortal lifespan on an Avar blighted for millennia to come by ' +
      'the manner of its arrival.'

  const tags = ['Meteor impact', 'Hadar', 'Sphere of Order', 'Empyreans', capitalize(alignment)]
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  await site.addMarker('Meteor impact site: Struck by an exiled empyrean ' +
    `cast down by Hadar in millennium ${sim.millennium} for its failure to ` +
    `uphold the ideals of ${alignment}, causing a global catastrophe.`)
}

const recordFluidityMeteor = (sim: Simulation): Promise<void> => {
  if (Math.random() < 0.5) {
    return recordFluidityMeteorRock(sim)
  } else {
    return recordFluidityMeteorElemental(sim)
  }
}

const recordFluidityMeteorRock = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const mass = (Math.random() * 3) + 1
  const massHu = mass.toFixed(2) + ' trillion kilograms'
  const azoth = (Math.random() * 0.4) + 0.2
  const azothPercent = `${(azoth * 100).toFixed(2)}%`
  const azothMass = mass * azoth
  const azothMassHu = azothMass.toFixed(2) + ' trillion kilograms'

  const site = region === null ? null : impact(sim, region)
  const description = site === null
    ? `A meteor from the Sphere of Fluidity with a mass of ${massHu}` +
    'smashed into the sea. The resulting super-tsunamis that circled the ' +
    'globe wiped out 10% of all populations living along the coasts.'
    : `A meteor from the Sphere of Fluidity with a mass of ${massHu} ` +
    `smashed into ${site.id}, instantly wiping out all life in the region, ` +
    'devastating the surrounding regions, and reducing habitability ' +
    `worldwide by half. The meteor was ${azothPercent} azoth, creating a ` +
    `massive deposit of ${azothMassHu} of the cured metal in the region.`

  const tags = ['Meteor impact', 'Sphere of Fluidity', 'Azoth']
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  await site.addMarker('Meteor impact site: Struck by a meteor from the ' +
    `Sphere of Fluidity in  millennium ${sim.millennium}. It was ${massHu},  ` +
    'resulting in the immediate death of everyone in the region and a 50% ' +
    'reduction in global habitability.')
  await site.addMarker('Massive Azoth Deposit: A meteor strike from ' +
    `millennium ${sim.millennium} left ${azothMassHu} of the cured metal in ` +
    'the region.')
}

const recordFluidityMeteorElemental = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const site = region === null ? null : impact(sim, region)
  const element = sample(['fire', 'air', 'water', 'earth', 'aether']) ?? 'aether'
  const coastal = Object.values(sim.world.regions).filter(region => region.tags.includes('coastal'))
  let elementalRegion: Region | null = site
  let description
  if (site === null && element === 'water') {
    description = 'A powerful water elemental was trapped in stone and cast ' +
      'down to Avar. It landed in the sea, where the ferocity of its impact ' +
      'caused super-tsunamis that circled the globe, wiping out 10% of all ' +
      'coastal populations. The impact cracked open its stony prison, and ' +
      'has roamed the oceans of Avar ever since.'
  } else if (site === null && element === 'earth') {
    elementalRegion = sample(coastal) as Region
    description = 'A powerful earth elemental was cast down to Avar. It ' +
        'landed in the sea, where the ferocity of its impact caused ' +
        'super-tsunamis that circled the globe, wiping out 10% of all ' +
        'coastal populations. It took years of struggle, but the elemental ' +
        'eventually found its way  to dry land, on the shores of ' +
        `${elementalRegion.id}.`
  } else if (site === null && element === 'fire') {
    const island = sample(getChances(1, 100))
    const underseaVolcano = sample(getChances(1, 3))
    description = 'A powerful fire elemental was trapped in stone and cast ' +
      'down to Avar. It landed in the sea, where the ferocity of its impact ' +
      'caused super-tsunamis that circled the globe, wiping out 10% of all ' +
      'coastal populations.'
    if (island) {
      description += ' Its stony prison held, protecting it from the ' +
        'elemental power of the ocean that might have otherwise extinguished ' +
        'it. Thrashing within its prison, though, it became an undersea ' +
        'volcano. In time, it had ejected so much lava in its rage that it ' +
        'formed a new island — potentially providing the fire elemental ' +
        'a means of escape, after the passage of millennia.'
    } else if (underseaVolcano) {
      description += ' Its stony prison held, protecting it from the ' +
        'elemental power of the ocean that might have otherwise extinguished ' +
        'it. Thrashing within its prison, though, it became an undersea ' +
        'volcano. In time, it may eject enough lava in its rage to form ' +
        'a new island — and through such an island, perhaps, finally, ' +
        'escape — but that is not something that has happened yet.'
    } else {
      description += ' The cataclysmic fall broke open the elemental\'s ' +
        'rocky prison. As powerful as it was, it was no match for the ' +
        'elemental power of the ocean, and was extinguished within hours.'
    }
  } else if (site === null) {
    elementalRegion = sample(coastal) as Region
    description = `A powerful ${element} elemental was trapped in a cage of ` +
      'stone and cast down to Avar. It landed in the sea, where the ferocity ' +
      'of its impact caused super-tsunamis that circled the globe, wiping ' +
      'out 10% of all coastal populations. In its cataclysmic fall, the ' +
      'shell broke open. It took years of struggle, but the elemental ' +
      'eventually found its way  to dry land, on the shores of ' +
      `${elementalRegion.id}.`
  } else {
    const wasCast = element === 'earth'
      ? 'A powerful earth elemental was cast'
      : `A powerful ${element} elemental was trapped in a cage of stone and cast`
    const survived = element === 'earth'
      ? 'survived its fall'
      : 'not only survived its fall, but was freed from its rocky shell by the impact'
    description = `${wasCast} down to Avar. It landed in ${site.id}. The ` +
      'cataclysmic impact immediately wiped out all humanoid populations in ' +
      'the region, devastated all nearby regions, and reduced habitability ' +
      `worldwide by half. The elemental ${survived}.`
  }

  const tags = ['Meteor impact', 'Sphere of Fluidity', 'Elementals', `${capitalize(element)} Elementals`]
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (elementalRegion) {
    const elemental = createElemental(sim, element)
    elementalRegion.immortals.push(elemental)
  }

  if (site === null) return

  await site.addMarker(`Meteor impact site: A powerful ${element} elemental ` +
    `was cast down to Avar in millennium ${sim.millennium}, causing a global` +
    'catastrophe.')
}

const recordWarmthMeteor = (sim: Simulation): Promise<void> => {
  if (Math.random() < 0.5) {
    return recordWarmthMeteorRock(sim)
  } else {
    return recordWarmthMeteorEntity(sim)
  }
}

const recordWarmthMeteorRock = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const mass = (Math.random() * 3) + 1
  const massHu = mass.toFixed(2) + ' trillion kilograms'
  const ori = (Math.random() * 0.4) + 0.2
  const oriPercent = `${(ori * 100).toFixed(2)}%`
  const oriMass = mass * ori
  const oriMassHu = oriMass.toFixed(2) + ' trillion kilograms'

  const site = region === null ? null : impact(sim, region)
  const description = site === null
    ? `A meteor from the Sphere of Warmth with a mass of ${massHu}` +
    'smashed into the sea. The resulting super-tsunamis that circled the ' +
    'globe wiped out 10% of all populations living along the coasts.'
    : `A meteor from the Sphere of Warmth with a mass of ${massHu} ` +
    `smashed into ${site.id}, instantly wiping out all life in the region, ` +
    'devastating the surrounding regions, and reducing habitability ' +
    `worldwide by half. The meteor was ${oriPercent} orichalcum, creating a ` +
    `massive deposit of ${oriMassHu} of the cured metal in the region.`

  const tags = ['Meteor impact', 'Sphere of Warmth', 'Orichalcum']
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  await site.addMarker('Meteor impact site: Struck by a meteor from the ' +
    `Sphere of Warmth in  millennium ${sim.millennium}. It was ${massHu},  ` +
    'resulting in the immediate death of everyone in the region and a 50% ' +
    'reduction in global habitability.')
  await site.addMarker('Massive Orichalcum Deposit: A meteor strike from ' +
    `millennium ${sim.millennium} left ${oriMassHu} of the cured metal in ` +
    'the region.')
}

const recordWarmthMeteorEntity = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const site = region === null ? null : impact(sim, region)
  const entity = sample(['Solarian', 'Gelid']) ?? 'Solarian'
  const captors = sample(['Solarian', 'Gelid']) ?? 'Solarian'
  const cast = entity === captors
    ? `A ${entity} was cast out of the Sphere of Warmth by its own people`
    : `A ${entity} was cast out of the sphere of Warmth by the ${captors}s`
  const description = site === null
    ? `${cast}, trapped in mortal, humanoid form, and sent hurtling to Avar. ` +
      `It impacted the sea with such force that it caused super-tsunamis ` +
      'to circle the world, reducing the world\'s coastal populations by ' +
      `10%. The magic that exiled the ${entity} allowed it to survive its ` +
      'journey through the spheres and its cataclysmic impact, but did not ' +
      'grant it the superhuman strength and stamina it would need to swim ' +
      'to shore from where it landed in the middle of the ocean. It drowned ' +
      'shortly following its arrival.'
    : `${cast}, trapped in mortal, humanoid form, and sent hurtling to Avar. ` +
      `It smashed into ${site.id}, where the speed of its impact caused the` +
      'immediate death of all the humanoids living there, devastated the ' +
      'surrounding regions, and reduced worldwide habitability by half. The ' +
      `magic that exiled the ${entity} allowed it to survive its journey ` +
      'through the spheres and its cataclysmic impact, allowing it to live ' +
      'out a mortal lifespan on an Avar blighted for millennia to come by ' +
      'the manner of its arrival.'

  const tags = ['Meteor impact', 'Sphere of Warmth', entity]
  if (entity !== captors) tags.push(captors)
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  await site.addMarker(`Meteor impact site: Struck by an exiled ${entity} ` +
    `cast down by ${entity === captors ? 'its own people' : `the ${captors}`} in ` +
    `millennium ${sim.millennium}, causing a global catastrophe.`)
}

const recordDeathMeteor = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const mass = (Math.random() * 3) + 1
  const massHu = mass.toFixed(2) + ' trillion kilograms'
  const adam = (Math.random() * 0.4) + 0.2
  const adamPercent = `${(adam * 100).toFixed(2)}%`
  const adamMass = mass * adam
  const adamMassHu = adamMass.toFixed(2) + ' trillion kilograms'

  const site = region === null ? null : impact(sim, region)
  const description = site === null
    ? `A chunk of Shol ${massHu} ejected by the Sphere of Death smashed ` +
      'into the sea. The resulting super-tsunamis that circle the globe ' +
      'wiped out 10% of all populations living along the coasts. The meteor ' +
      'carried thousands of tormented ghosts, which haunted the region of ' +
      'sea where the meteor crashed for many centuries after the impact ' +
      'until they dissipated.'
    : `A chunk of Shol ${massHu} ejected by the Sphere of Death smashed ` +
      `into ${site.id}, immediately killing everyone in the region, ` +
      'devastating all of the regions near it, and reducing global ' +
      'habitability by half. The meteor carried thousands of tormented ' +
      'ghosts, which haunted the region for many centuries after the impact ' +
      `until they dissipated. The meteor was also ${adamPercent} adamant, ` +
      `creating a massive deposit of ${adamMassHu} of the cured metal in ` +
      'the region.'

  const tags = ['Meteor impact', 'Shol', 'Sphere of Death', 'Adamant', 'Ghosts']
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  await site.addMarker('Meteor impact site: Struck by a meteor from Shol ' +
    `in  millennium ${sim.millennium}. It was ${massHu},  resulting in the ` +
    'immediate death of everyone in the region and a 50% reduction in ' +
    'global habitability.')
  await site.addMarker('Massive Adamant Deposit: A meteor strike from ' +
    `millennium ${sim.millennium} left ${adamMassHu} of the cured metal in ` +
    'the region.')
}

const recordTimeMeteor = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const mass = (Math.random() * 3) + 1
  const massHu = mass.toFixed(2) + ' trillion kilograms'
  const orcan = (Math.random() * 0.4) + 0.2
  const orcanPercent = `${(orcan * 100).toFixed(2)}%`
  const orcanMass = mass * orcan
  const orcanMassHu = orcanMass.toFixed(2) + ' trillion kilograms'

  const site = region === null ? null : impact(sim, region)
  const description = site === null
    ? `A meteor from the Sphere of Time ${massHu} in mass smashed ` +
      'into the sea. The resulting super-tsunamis that circled the globe ' +
      'wiped out 10% of all populations living along the coasts. The impact ' +
      'created an area in the deep ocean where time has never flowed quite ' +
      'right ever since.'
    : `A meteor from the Sphere of Time ${massHu}  in mass smashed ` +
      `into ${site.id}, immediately killing everyone in the region, ` +
      'devastating all of the regions near it, and reducing global ' +
      'habitability by half. Those who survived living near the impact ' +
      'site experienced changes over the following millennium that would ' +
      'normally have taken two or three times as long, and the flow of time ' +
      'in the region can be strange even today. The meteor was also ' +
      `${orcanPercent} orcan, creating a massive deposit of ${orcanMassHu} ` +
      'of the cured metal in the region.'

  const tags = ['Meteor impact', 'Sphere of Time', 'Orcan']
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  const unseal = (regions: Region[], num: number = 1) => {
    for (const region of regions) {
      if (!region.species || !(region.species in SpeciesPlurals)) continue
      const text = `We become ${SpeciesPlurals[region.species].toLowerCase()}.`
      for (const p of region.populations) {
        const scrolls = p.scribe.scrolls.filter(scroll => scroll.text === text)
        for (const scroll of scrolls) {
          for (let i = 0; i < num; i++) scroll.unseal()
        }
      }
    }
  }

  unseal(getZone1(sim, site), 2)
  unseal(getZone2(sim, site), 1)

  await site.addMarker('Meteor impact site: Struck by a meteor from the ' +
    `Sphere of Time in  millennium ${sim.millennium}. It was ${massHu}, ` +
    'resulting in the immediate death of everyone in the region and a 50% ' +
    'reduction in global habitability.')
  await site.addMarker('Massive Orcan Deposit: A meteor strike from ' +
    `millennium ${sim.millennium} left ${orcanMassHu} of the cured metal in ` +
    'the region.')
}

const recordFallingStar = async (sim: Simulation, region?: Region | null): Promise<void> => {
  const site = region === null ? null : impact(sim, region)
  const description = site === null
    ? 'A star was cast down from the Firmament of the Sphere of Space to ' +
      'Avar. It struck the sea with such force that it caused super-tsunamis ' +
      'that circled the world, killing 10% of the populations living along ' +
      'the coast. The star had been trapped in a mortal, humanoid form, and ' +
      'though the magic that caused its fall had protected it along its ' +
      'of millions of kilometers through the spheres and the cataclysmic ' +
      'impact, it did not grant the entity the superhuman strength or ' +
      'it would have needed to swim to shore from the middle of the ocean ' +
      'where it landed. It drowned a few hours after its impact.'
    : 'A star was cast down from the Firmament of the Sphere of Space to ' +
      `Avar, crashing into ${site.id}, where it instantly killed the ` +
      'region\'s entire population, devastated all of the surrounding ' +
      'regions, and cut worldwide habitability in half. The magic that ' +
      'cast the star from the Firmament had transformed it in a mortal, ' +
      'humanoid form, but also protected it in its journey of millions of ' +
      'kilometers through the spheres and even from its cataclysmic ' +
      'impact, allowing it to live out a normal, mortal lifespan on an ' +
      'Avar blighted for millennia to come by the manner of its arrival.'

  const tags = ['Meteor impact', 'Sphere of Space']
  if (site) tags.push(site.id)

  sim.history.add({
    millennium: sim.millennium,
    description,
    tags
  })

  if (site === null) return

  await site.addMarker('Meteor impact site: Struck by a star cast down from ' +
    'the Firmament and bound to a mortal, humanoid form. It lived in the region ' +
    'devastated by its cataclysmic arrival for a normal humanoid lifespan.')
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
  recordOrderMeteor,
  recordOrderMeteorRock,
  recordOrderMeteorEmpyrean,
  recordFluidityMeteor,
  recordFluidityMeteorRock,
  recordFluidityMeteorElemental,
  recordWarmthMeteor,
  recordWarmthMeteorRock,
  recordWarmthMeteorEntity,
  recordDeathMeteor,
  recordTimeMeteor,
  recordFallingStar
}
