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
      description: 'Underground lake (4773 sq. km)',
      impact: 477300
    },
    {
      description: 'Underground lake (1155 sq. km)',
      impact: 115500
    },
    {
      description: 'Underground lake (821 sq. km)',
      impact: 82100
    },
    {
      description: 'Underground lake (582 sq. km)',
      impact: 58200
    }
  ],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  markers: [],
  ogrism: 0,
  populations: [],
  species: 'Gnome',
  tags: ['world-below'],
}

export default PD02
