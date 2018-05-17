import { h } from 'preact'
import Report from '../../models/report'
import {
  formatMatchKey,
  formatTeamNumber,
  getNumber,
  lerp,
  lerper
} from '../../utils'
import style from './style.sss'

interface ChartProps {
  reports: Report[]
  stat: string
  fieldType: string
  colorKey?: { [key: string]: string }
}

const Chart = ({
  reports: allReports,
  stat,
  fieldType,
  colorKey
}: ChartProps) => {
  const min = Math.min(...allReports.map(e => getNumber(e.stats[stat])))
  const max = Math.max(...allReports.map(e => getNumber(e.stats[stat])))

  const groupedTeamStats: { [key: string]: Report[] } = {}

  allReports.map(
    r => (groupedTeamStats[r.team] = (groupedTeamStats[r.team] || []).concat(r))
  )

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

  const lerpX = lerper(0, allReports.length - 1, 20, 560)
  const lerpY = lerper(min, max, 475, 40)
  const textSize = lerp(640 / allReports.length, 100, 34, 10, 8)

  return (
    <svg class={style.chart} viewBox="0 0 640 480">
      {allReports.map(report => (
        <text
          textAnchor="middle"
          x="10"
          y={lerpY(getNumber(report.stats[stat]))}
          key={report.eventKey}
        >
          {getNumber(report.stats[stat])}
        </text>
      ))}
      <line x1="20" x2="20" y1="0" y2="475" strokeWidth="3" />
      <line x1="20" x2="640" y1="475" y2="475" strokeWidth="3" />
      {Array.from(Object.entries(groupedTeamStats), ([key, reports]) => (
        <g key={key}>
          <polyline
            strokeWidth="2"
            stroke={
              colorKey !== undefined
                ? colorKey[formatTeamNumber(key)]
                : 'purple'
            }
            points={reports
              .map(
                report =>
                  `${lerpX(allReports.indexOf(report))},${lerpY(
                    getNumber(report.stats[stat])
                  )}`
              )
              .join(' ')}
          />
          {reports.map(report => (
            <g key={report.eventKey}>
              <a
                href={`/events/${report.eventKey}/${report.matchKey.slice(
                  report.eventKey.length + 1
                )}`}
              >
                <circle
                  r="4"
                  fill={
                    colorKey !== undefined
                      ? colorKey[formatTeamNumber(key)]
                      : 'purple'
                  }
                  stroke="0.2"
                  cx={lerpX(allReports.indexOf(report))}
                  cy={lerpY(getNumber(report.stats[stat]))}
                />
              </a>
              <text
                class={style.tooltip}
                fontSize={textSize}
                x={lerpX(allReports.indexOf(report))}
                y={lerpY(getNumber(report.stats[stat])) - 7.5}
              >
                {formatMatchKey(report.matchKey)}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  )
}

export default Chart
