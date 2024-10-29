import { IRegion } from '../../index.d.ts'

const MD03: IRegion = {
  id: 'MD03',
  adjacentRegions: ['MC03', 'FD04', 'FD12', 'GD02', 'GD01', 'FD08', 'FD05'],
  area: 466427,
  biome: 'World Below',
  capacity: 7773,
  dragons: [],
  features: [
    {
      description: 'Underground lake (2922 sq. km)',
      impact: 292200
    },
    {
      description: 'Underground lake (2551 sq. km)',
      impact: 255100
    },
    {
      description: 'Underground lake (734 sq. km)',
      impact: 73400
    },
    {
      description: 'Underground lake (851 sq. km)',
      impact: 85100
    }
  ],
  feyInfluence: 0,
  habitability: 1,
  immortals: [],
  languages: [],
  markers: [],
  ogrism: 0,
  populations: [],
  tags: ['world-below'],
}

export default MD03
