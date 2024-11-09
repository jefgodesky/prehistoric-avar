import { nanoid } from 'nanoid'
import type Simulation from './Simulation.ts'

const MARKABLE_EVENTS = {
  ADD: 'Marker.Add',
  REMOVE: 'Marker.Remove',
  MARKED: 'Marker.Added',
  UNMARKED: 'Marker.Removed'
} as const

class Markable {
  id: string
  markers: string[]
  simulation: Simulation

  // deno-lint-ignore no-explicit-any
  constructor (sim: Simulation, data?: Record<PropertyKey, any>) {
    this.id = data?.id || nanoid()
    this.markers = data?.markers || []
    this.simulation = sim

    const { emitter } = this.simulation
    emitter.on(MARKABLE_EVENTS.ADD, (data: { id: string, marker: string }) => this.handleAdd(data))
    emitter.on(MARKABLE_EVENTS.REMOVE, (data: { id: string, marker: string }) => this.handleRemove(data))
  }

  async addMarker (marker: string): Promise<void> {
    this.markers.push(marker)
    await this.simulation.emitter.emit(MARKABLE_EVENTS.MARKED, { id: this.id, marker})
  }

  async removeMarker (marker: string): Promise<void> {
    this.markers = this.markers.filter(m => m !== marker)
    await this.simulation.emitter.emit(MARKABLE_EVENTS.UNMARKED, { id: this.id, marker })
  }

  private async handleAdd ({ id, marker }: { id: string, marker: string }): Promise<void> {
    if (id === this.id) await this.addMarker(marker)
  }

  private handleRemove ({ id, marker }: { id: string, marker: string }): void {
    if (id === this.id) this.removeMarker(marker).then(() => { /* do nothing */ })
  }
}

export default Markable
export { MARKABLE_EVENTS }
