import Simulation from '../../../classes/Simulation.ts'

const uniqueEventCheck = (sim: Simulation, event: string, prerequisites: string[] = []): boolean => {
  const { events } = sim.world
  const allPrereqs = prerequisites.every(event => events.includes(event))
  const hasEvent = events.includes(event)
  return allPrereqs && !hasEvent
}

export default uniqueEventCheck
