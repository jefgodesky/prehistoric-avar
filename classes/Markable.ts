import { nanoid } from 'nanoid'
import { Emitter } from '../index.d.ts'

const MARKABLE_EVENTS = {
  ADD: 'Marker.Add',
  REMOVE: 'Marker.Remove',
  MARKED: 'Marker.Added',
  UNMARKED: 'Marker.Removed'
} as const

class Markable {
  id: string
  markers: string[]
  protected emitter: Emitter

  // deno-lint-ignore no-explicit-any
  constructor (emitter: Emitter, data?: Record<PropertyKey, any>) {
    this.id = data?.id || nanoid()
    this.markers = data?.markers || []
    this.emitter = emitter

    emitter.on(MARKABLE_EVENTS.ADD, (data: { id: string, marker: string }) => this.handleAdd(data))
    emitter.on(MARKABLE_EVENTS.REMOVE, (data: { id: string, marker: string }) => this.handleRemove(data))
  }

  async addMarker (marker: string): Promise<void> {
    this.markers.push(marker)
    await this.emitter.emit(MARKABLE_EVENTS.MARKED, { id: this.id, marker})
  }

  async removeMarker (marker: string): Promise<void> {
    this.markers = this.markers.filter(m => m !== marker)
    await this.emitter.emit(MARKABLE_EVENTS.UNMARKED, { id: this.id, marker })
  }

  private async handleAdd ({ id, marker }: { id: string, marker: string }): Promise<void> {
    if (id === this.id) await this.addMarker(marker)
  }

  private handleRemove ({ id, marker }: { id: string, marker: string }): void {
    if (id === this.id) this.removeMarker(marker)
  }
}

export default Markable
export { MARKABLE_EVENTS }
