import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IPoint } from './index.t.ts'
import commandsToPoints from './commands-to-points.ts'

describe('commandsToPoints', () => {
  it('converts an SVG path for a square to an array of IPoint objects', () => {
    const points = commandsToPoints('M450,450 L1350,450 L1350,900 L450,900 Z')
    const map = points.map((p: IPoint) => [p.latitude, p.longitude])
    expect(map).toEqual([[0, -90], [0, 90], [-90, 90], [-90, -90]])
  })

  it('converts an SVG path for a complex polygon near the south pole to an array of IPoint objects', () => {
    const points = commandsToPoints('M300,800 L600,850 L900,800 L1200,850 L1500,800 Z')
    const map = points.map((p: IPoint) => [p.latitude, p.longitude])
    expect(map).toEqual([[-70, -120], [-80, -60], [-70, 0], [-80, 60], [-70, 120]])
  })

  it('converts a real area to IPoint objects', () => {
    const d = 'm 1188.5371,208.74996 c -0.8875,-0.1 -1.7363,0.0508 -2.2363,0.55078 -1,1 -0.6016,3.39844 -1.6016,4.89844 -1,1.5 -3.4,2.10078 -5.5,2.30078 -1.2794,0.11631 -2.427,0.0899 -3.4531,0.13477 -0.7265,-0.0155 -1.4177,0.0574 -1.9453,0.36523 -0.3899,0.24813 -0.6686,0.63275 -0.9004,1.0625 -0.5124,0.74779 -0.9816,1.5841 -1.7012,2.23828 -1.2,1 -3.2,1.39844 -5,1.89844 -1.9,0.5 -3.5,1.10078 -3.5,2.30078 0,1.2 1.6016,2.79922 2.1016,4.69922 0.25,0.9 0.2242,1.85156 0.012,2.60156 -0.2125,0.75 -0.6133,1.29844 -1.1133,1.39844 -1,0.1 -2.3984,-1.49922 -3.8984,-2.69922 -1.5,-1.2 -3.1016,-1.79922 -5.1016,-1.19922 -0.2632,0.0921 -0.5756,0.34698 -0.8515,0.48047 -1.4986,-0.16791 -2.9429,0.16194 -3.8477,0.71875 -1.0442,0.64259 -1.469,1.66392 -1.1445,2.5625 -0.2864,0.21622 -0.5713,0.42664 -0.8555,0.63672 -2.3,1.6 -4.7,3.00156 -7,3.60156 -2.3,0.7 -4.7008,0.69844 -5.8008,1.89844 -1.1764,1.07834 -1.2043,3.40694 -1.6758,5.47656 -0.2299,0.34657 -0.4396,0.65329 -0.7226,1.125 -0.7301,1.36889 -1.5601,3.45372 -1.8633,5.18164 -3e-4,0.002 0,0.004 0,0.006 -0.3065,0.52324 -0.6198,1.04214 -0.7871,1.44922 -0.278,0.64482 -0.4492,1.28887 -0.4492,2.0625 0,1.5 0.6008,3.50078 1.8008,4.80078 1.2,1.4 2.8,1.99844 4,3.39844 0.6,0.65 1.0504,1.47656 1.5254,2.22656 0.046,0.0729 0.1,0.12997 0.1465,0.20117 v 0.002 c 0.113,0.19567 0.1953,0.49183 0.3262,0.67187 0.8,1.2 2.2,2.19922 4,2.19922 1.8,0 4.1992,-1 5.6992,-2 0.1559,-0.10394 0.186,-0.20293 0.3223,-0.30664 0.2508,-0.0671 0.5757,-0.0916 0.7793,-0.19336 0.4224,-0.21123 0.7019,-0.52773 0.8574,-0.90234 0.023,-0.059 0.075,-0.10493 0.086,-0.16407 0,-0.0123 0.015,-0.0208 0.018,-0.0332 0.1125,-0.475 -0.011,-1.05117 -0.4609,-1.70117 -0.5834,-1.02088 -1.6147,-2.10074 -2.3106,-3.10156 -7e-4,-0.001 0,-0.003 0,-0.004 0.034,-0.1236 0.1062,-0.28466 0.1484,-0.41211 0.3698,-0.60018 0.9635,-1.15909 1.6641,-1.48242 1.4,-0.7 3,-0.7 5,-1 2,-0.4 4.4,-1 6,-2 0.6219,-0.36583 1.1063,-0.75784 1.6094,-1.13281 2.3746,0.18599 5.054,1.22244 6.5898,1.73437 0.9666,0.37592 1.5028,0.51416 1.8633,0.48633 0.5433,0.007 1.0479,-0.16762 1.8359,-0.58789 1.5,-0.9 4.1008,-2.49844 5.8008,-3.39844 1.7,-0.8 2.3008,-0.8 3.8008,-1.5 1.5,-0.6 3.8984,-2.00156 5.3984,-3.60156 0.4849,-0.54956 0.7119,-1.16741 1.002,-1.76953 0.1276,-0.15516 0.2165,-0.35549 0.3144,-0.55274 0.066,-0.17852 0.2018,-0.34016 0.25,-0.52148 0.2513,-0.82124 0.2903,-1.83495 0.035,-2.85547 -0.4525,-1.80982 -1.7199,-3.63768 -2.2696,-5.5957 0.2855,-0.41904 0.5048,-0.84168 0.8711,-1.26368 v 0 c 0.3442,-0.20305 0.6327,-0.3937 1.0957,-0.64062 1.5,-0.8 3.5008,-2.2 4.3008,-4 0.5972,-1.19436 0.6921,-2.52573 0.8457,-3.69336 0.4295,-0.95674 0.9449,-1.7353 1.4355,-2.48828 0.78,-0.35654 1.7582,-0.49817 2.7188,-0.81836 1.1406,-0.38019 2.2036,-1.14318 3.2285,-2.10156 1.7818,-0.52053 3.2653,-1.45365 3.1699,-2.59766 -0.044,-0.24382 -0.2049,-0.50389 -0.4043,-0.75976 0.2107,-0.37519 0.3774,-0.73328 0.4551,-1.04297 0.036,-0.14395 -0.022,-0.23305 -0.023,-0.35547 v -0.002 c 10e-5,-5.8e-4 -10e-5,-10e-4 0,-0.002 0.093,-0.48532 0.1033,-0.96896 -0.027,-1.43945 -0.5,-1.9 -2.8984,-3.5 -4.8984,-3.5 -2,0 -3.6016,1.60156 -4.6016,1.60156 -1,0 -1.3992,-1.60156 -2.6992,-2.60156 -0.65,-0.5 -1.5754,-0.84922 -2.4629,-0.94922 z'
    const points = commandsToPoints(d)
    expect(points.length).toBe(1580)
  })
})
