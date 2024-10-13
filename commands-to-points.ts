import { SVGPathData, SVGPathDataParser } from 'svg-pathdata'
import { IPoint } from './index.t.ts'
import approximateCurves from './approximate-curves.ts'
import coordsToPoint from './coords-to-point.ts'

const commandsToPoints = (d: string): IPoint[] => {
  const parser = new SVGPathDataParser()
  const relevantCommandTypes: number[] = [
    SVGPathData.HORIZ_LINE_TO,
    SVGPathData.VERT_LINE_TO,
    SVGPathData.MOVE_TO,
    SVGPathData.LINE_TO
  ]
  const commands = parser.parse(approximateCurves(d))
    .filter(cmd => relevantCommandTypes.includes(cmd.type as number))
    .filter(cmd => 'x' in cmd && 'y' in cmd)
  return commands.map(cmd => coordsToPoint(cmd.x, cmd.y))
}

export default commandsToPoints
