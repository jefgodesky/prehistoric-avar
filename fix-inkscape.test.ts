import { assertEquals } from '@std/assert'
import { parse } from 'npm:yaml'
import fixInkscape from './fix-inkscape.ts'

Deno.test('fixInkscape', () => {
  const input = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <g id="g215" inkscape:label="F01">
        <path id="path364-7" style="display:inline;fill:none" inkscape:label="Body" d="M0 0 L100 100" />
        <path id="path223" style="display:inline;fill:#445500" inkscape:label="Border" d="M0 0 L200 200" />
      </g>
      <g id="g216" inkscape:label="Other stuff"></g>
    </svg>
  `

  const regions = `
Boreal forests:
  Class names:
    - forest
    - boreal
  Regions:
    - F01
  `

  const expected = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <g id="F01" class="forest boreal">
        <path d="M0 0 L100 100" class="body"/>
        <path d="M0 0 L200 200" class="border"/>
      </g>
      <g id="g216" xmlns:inkscape="" inkscape:label="Other stuff"/>
    </svg>
  `

  const data = parse(regions) as Record<string, { 'Class names': string[], Regions: string[] }>
  const result = fixInkscape(input, data)
  assertEquals(result.trim(), expected.trim())
})
