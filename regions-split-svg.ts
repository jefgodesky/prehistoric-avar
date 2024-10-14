import { DOMParser } from 'xmldom'

const MAP_DIRECTORY = './maps'
const REGIONS_SUBDIRECTORY = `${MAP_DIRECTORY}/regions`
const srcPath = `${MAP_DIRECTORY}/regions.svg`

try {
  const src = await Deno.readTextFile(srcPath)
  const svg = new DOMParser().parseFromString(src)
  const regions = svg.getElementsByTagName('path')
  const arr = Array.from(regions) as SVGPathElement[]
  for (const region of arr) {
    const id = region.getAttribute('id')
    const d = region.getAttribute('d')
    const newSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1800" height="900" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <MetaInfo xmlns="http://www.prognoz.ru">
    <Geo>
      <GeoItem X="0" Y="0" Latitude="90" Longitude="-180"/>
      <GeoItem X="1800" Y="900" Latitude="-90" Longitude="180"/>
    </Geo>
  </MetaInfo>
  <path d="${d}" />
</svg>`
    const destPath = `${REGIONS_SUBDIRECTORY}/${id}.svg`
    await Deno.writeTextFile(destPath, newSVG)
    console.log(`Wrote ${id} SVG to ${destPath}`)
  }
} catch (error) {
  console.error('Error: ', error)
}
