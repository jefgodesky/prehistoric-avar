import { IRegion } from '../../index.d.ts'

const PD02: IRegion = {
  id: 'PD02',
  adjacentRegions: ['PC02', 'FD02', 'FD03'],
  area: 2461234,
  biome: 'World Below',
  capacity: 41020,
  dragons: [],
  features: [
    {
      description: 'Underground lake (1123 sq. km)',
      impact: 112300
    },
    {
      description: 'Underground lake (2984 sq. km)',
      impact: 298400
    },
    {
      description: 'Underground lake (810 sq. km)',
      impact: 81000
    },
    {
      description: 'Underground lake (639 sq. km)',
      impact: 63900
    }
  ],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  markers: [],
  ogrism: 0,
  populations: [],
  species: 'Gnome',
  tags: ['world-below'],
}

export default PD02
