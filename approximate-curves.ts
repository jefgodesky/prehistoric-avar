import { SVGPathData } from 'svg-pathdata'
import { svgPathProperties } from 'svg-path-properties'

const approximateCurve = (d: string, precision: number = 1): string => {
  const properties = new svgPathProperties(d)
  const totalLength = properties.getTotalLength()
  const segments = Math.ceil(totalLength / precision)

  const points: [number, number][] = []
  for (let i = 0; i <= segments; i++) {
    const point = properties.getPointAtLength((i / segments) * totalLength)
    points.push([point.x, point.y])
  }

  return points.map(([x, y]) => `L${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
}

const approximateCurves = (d: string, precision: number = 1): string => {
  const pathData = new SVGPathData(d)
  const commands: string[] = []
  const prev = { x: 0, y: 0 }

  for (const cmd of pathData.commands) {
    switch (cmd.type) {
      case SVGPathData.MOVE_TO:
        commands.push(`M${cmd.x},${cmd.y}`)
        prev.x = cmd.x; prev.y = cmd.y; break
      case SVGPathData.LINE_TO:
        commands.push(`L${cmd.x},${cmd.y}`)
        prev.x = cmd.x; prev.y = cmd.y; break
      case SVGPathData.CURVE_TO:
        commands.push(approximateCurve(
          `M${prev.x},${prev.y} C${cmd.x1},${cmd.y1},${cmd.x2},${cmd.y2},${cmd.x},${cmd.y}`,
          precision))
        prev.x = cmd.x; prev.y = cmd.y; break
      case SVGPathData.SMOOTH_CURVE_TO:
        commands.push(approximateCurve(
          `M${prev.x},${prev.y} S${cmd.x2},${cmd.y2},${cmd.x},${cmd.y}`,
          precision))
        prev.x = cmd.x; prev.y = cmd.y; break
      case SVGPathData.QUAD_TO:
        commands.push(approximateCurve(
          `M${prev.x},${prev.y} Q${cmd.x1},${cmd.y1},${cmd.x},${cmd.y}`,
          precision))
        prev.x = cmd.x; prev.y = cmd.y; break
      default:
        break
    }
  }

  return commands.join(' ')
}

export default approximateCurves
