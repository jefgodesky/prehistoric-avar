import { nanoid } from 'nanoid'
import { Emitter } from '../index.d.ts'

const MARKABLE_EVENTS = {
  ADD: 'Marker.Add',
  REMOVE: 'Marker.Remove'
}

class Markable {
  id: string
  markers: string[]

  // deno-lint-ignore no-explicit-any
  constructor (emitter: Emitter, data?: Record<PropertyKey, any>) {
    this.id = data?.id || nanoid()
    this.markers = data?.markers || []

    emitter.on(MARKABLE_EVENTS.ADD, (data: { id: string, marker: string }) => this.handleAdd(data))
    emitter.on(MARKABLE_EVENTS.REMOVE, (data: { id: string, marker: string }) => this.handleRemove(data))
  }

  addMarker (marker: string): void {
    this.markers.push(marker)
  }

  removeMarker (marker: string): void {
    this.markers = this.markers.filter(m => m !== marker)
  }

  private handleAdd ({ id, marker }: { id: string, marker: string }): void {
    if (id === this.id) this.addMarker(marker)
  }

  private handleRemove ({ id, marker }: { id: string, marker: string }): void {
    if (id === this.id) this.removeMarker(marker)
  }
}

export default Markable
export { MARKABLE_EVENTS }
