class Markable {
  markers: string[]

  // deno-lint-ignore no-explicit-any
  constructor (data?: Record<PropertyKey, any>) {
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
