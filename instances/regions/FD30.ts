import { IRegion } from '../../index.d.ts'

const FD30: IRegion = {
  id: 'FD30',
  adjacentRegions: ['FC30', 'FD31', 'GD05'],
  area: 1978204,
  biome: 'World Below',
  capacity: 32970,
  dragons: [],
  features: [
    {
      description: 'Underground lake (5010 sq. km)',
      impact: 501000
    },
    {
      description: 'Underground lake (1740 sq. km)',
      impact: 174000
    },
    {
      description: 'Underground lake (571 sq. km)',
      impact: 57100
    },
    {
      description: 'Underground lake (565 sq. km)',
      impact: 56500
    }
  ],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  markers: [],
  ogrism: 0,
  populations: [],
  species: Gnome,
  tags: ['world-below'],
}

export default FD30
