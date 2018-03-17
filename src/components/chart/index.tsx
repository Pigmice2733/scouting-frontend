import { h } from 'preact'
import Report from '../../models/report'
import { lerp, lerper, getNumber, formatMatchKey } from '../../utils'
import { chart as chartClass, tooltip } from './style.sss'

interface ChartProps {
  reports: Report[]
  stat: string
  fieldType: string
}

const Chart = ({ reports, stat, fieldType }: ChartProps) => {
  const min = Math.min(...reports.map(e => getNumber(e.stats[stat])))
  const max = Math.max(...reports.map(e => getNumber(e.stats[stat])))

  if (max === min) {
    if (fieldType === 'bool') {
      if (max === 0) {
        return <div>Never</div>
      }
      if (max === 1) {
        return <div>Always</div>
      }
    }
    return <div>{min} every match</div>
  }

  const lerpX = lerper(0, reports.length - 1, 20, 560)
  const lerpY = lerper(min, max, 475, 40)
  const textSize = lerp(640 / reports.length, 100, 34, 10, 8)

  return (
    <svg class={chartClass} viewBox="0 0 640 480">
      <polyline
        stroke-width="2"
        points={reports
          .map(
            (report, i) => `${lerpX(i)},${lerpY(getNumber(report.stats[stat]))}`
          )
          .join(' ')}
      />
      {reports.map(report => (
        <text
          text-anchor="middle"
          x="10"
          y={lerpY(getNumber(report.stats[stat]))}
        >
          {getNumber(report.stats[stat])}
        </text>
      ))}}}
      <line x1="20" x2="20" y1="0" y2="475" stroke-width="3" />
      <line x1="20" x2="640" y1="475" y2="475" stroke-width="3" />
      {reports.map((report, i) => (
        <g>
          <circle
            r="4"
            stroke="0.2"
            cx={lerpX(i)}
            cy={lerpY(getNumber(report.stats[stat]))}
          />
          <text
            class={tooltip}
            font-size={textSize}
            x={lerpX(i)}
            y={lerpY(getNumber(report.stats[stat])) - 7.5}
          >
            {formatMatchKey(report.matchKey)}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default Chart
