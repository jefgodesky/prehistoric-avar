import { DOMParser, XMLSerializer } from 'npm:xmldom'

interface IRegion {
  'Class names': string[]
  Regions: string[]
}

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
          group.setAttribute('class', regionInfo['Class names'].join(' '))
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

export default fixInkscape
