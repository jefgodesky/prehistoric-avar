import { DOMParser } from 'xmldom'
import { parse } from 'yaml'
import getRegionIdList from './get-region-id-list.ts'
import type {IRegion} from './index.t.ts'

const directory = './maps'
const src = `${directory}/base.svg`
const regionsYAML = await Deno.readTextFile('regions.yml')
const regionData = parse(regionsYAML) as Record<string, IRegion>
const allRegions = getRegionIdList(regionData)

try {
  const data = await Deno.readTextFile(src)
  const domParser = new DOMParser()
  const doc = domParser.parseFromString(data, 'image/svg+xml')
  const regions = doc.getElementsByTagName('g')

  for (const region of Array.from(regions)) {
    const id = (region as SVGGElement).getAttribute('id')
    if (!id || !allRegions.includes(id)) continue

    let body: SVGPathElement | null = null
    for (let i = 0; i < (region as SVGGElement).childNodes.length; i++) {
      const child = (region as SVGGElement).childNodes[i]
      if (child.nodeType === 1 && child.nodeName === 'path' && (child as SVGPathElement).getAttribute('class') === 'body') {
        body = child as SVGPathElement
        break
      }
    }
    if (!body) continue

    const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="1800" height="900" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <MetaInfo xmlns="http://www.prognoz.ru">
    <Geo>
      <GeoItem X="0" Y="0" Latitude="90" Longitude="-180"/>
      <GeoItem X="1800" Y="900" Latitude="-90" Longitude="180"/>
    </Geo>
  </MetaInfo>
  <path
     d="${body.getAttribute('d')}" />
</svg>`
    const destPath = `${directory}/region${id}.svg`
    await Deno.writeTextFile(destPath, svg)
    console.log(`Wrote region ${id} to ${destPath}`)
  }
} catch (error) {
  console.error('Error: ', error)
}
