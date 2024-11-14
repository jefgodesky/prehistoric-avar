import { nanoid } from 'nanoid'

class Markable {
  id: string
  markers: string[]

  // deno-lint-ignore no-explicit-any
  constructor (data?: Record<PropertyKey, any>) {
    this.id = data?.id || nanoid()
    this.markers = data?.markers || []
  }

  addMarker (marker: string): void {
    this.markers.push(marker)
  }

  removeMarker (marker: string): void {
    this.markers = this.markers.filter(m => m !== marker)
  }
}

export default Markable
