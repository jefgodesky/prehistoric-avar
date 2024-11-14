import Simulation from '../../../classes/Simulation.ts'

const uniqueEventCheck = (event: string, prerequisites: string[] = []): boolean => {
  const { events } = Simulation.instance().world
  const allPrereqs = prerequisites.every(event => events.includes(event))
  const hasEvent = events.includes(event)
  return allPrereqs && !hasEvent
}

export default uniqueEventCheck
