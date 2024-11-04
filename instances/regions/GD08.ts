import { IRegion } from '../../index.d.ts'

const GD08: IRegion = {
  id: 'GD08',
  adjacentRegions: ['GC08', 'MD07', 'GD06', 'FD15', 'FD02', 'MD05', 'FD17'],
  area: 441027,
  biome: 'World Below',
  capacity: 7350,
  dragons: [],
  features: [
    {
      description: 'Underground lake (4067 sq. km)',
      impact: 406700
    },
    {
      description: 'Underground lake (2950 sq. km)',
      impact: 295000
    },
    {
      description: 'Underground lake (994 sq. km)',
      impact: 99400
    },
    {
      description: 'Underground lake (718 sq. km)',
      impact: 71800
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

export default GD08
