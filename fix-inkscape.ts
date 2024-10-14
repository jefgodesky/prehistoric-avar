import { DOMParser, XMLSerializer } from 'npm:xmldom'
import { parse } from 'yaml'
import type { IRegion } from './index.t.ts'

const fixInkscape = (input: string, regions: Record<string, IRegion>): string => {
  const parser = new DOMParser()
  const serializer = new XMLSerializer()
  const doc = parser.parseFromString(input, 'text/xml')
  const groups = doc.getElementsByTagName('g')

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    const label = group.getAttribute('inkscape:label')
    if (label) {
      for (const [_, regionInfo] of Object.entries(regions)) {
        if (regionInfo.Regions.includes(label)) {
          group.setAttribute('id', label)
          group.setAttribute('class', ['region', ...regionInfo['Class names']].join(' '))
          group.removeAttribute('inkscape:label')
          break
        }
      }

      const paths = group.getElementsByTagName('path')
      for (let j = 0; j < paths.length; j++) {
        const path = paths[j]
        const pathLabel = path.getAttribute('inkscape:label')
        if (pathLabel) {
          path.setAttribute('class', pathLabel.toLowerCase())
          path.removeAttribute('inkscape:label')
          path.removeAttribute('style')
          path.removeAttribute('id')
        }
      }
    }
  }

  return serializer.serializeToString(doc)
}

if (import.meta.main) {
  const main = async (): Promise<void> => {
    if (Deno.args.length !== 2) {
      console.error('Usage: deno task fix <before> <after>')
      Deno.exit(1)
    }

    const [before, after] = Deno.args

    try {
      const dir = './maps'
      const beforeSVG = await Deno.readTextFile(`${dir}/${before}.svg`)
      const regionsYAML = await Deno.readTextFile('regions.yml')
      const regions = parse(regionsYAML) as Record<string, IRegion>
      await Deno.writeTextFile(`${dir}/${after}.svg`, fixInkscape(beforeSVG, regions))
      console.log(`New map successfully written to ${dir}/${after}.svg`)
    } catch (error) {
      console.error('Error: ', error)
      Deno.exit(1)
    }
  }

  main()
}

export default fixInkscape
export type { IRegion }
