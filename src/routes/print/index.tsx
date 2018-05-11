import { Component, h } from 'preact'
import { getAllianceAnalysis, getSchema } from '../../api'
import Analysis from '../../models/analysis'
import Schema from '../../models/schema'
import Resolver from '../../resolver'
import {
  camelToTitle,
  formatMatchKey,
  formatTeamNumber,
  toPercentage,
  toPrettyNumber
} from '../../utils'
import style from './style.sss'

interface PrintProps {
  eventId: string
  matchId: string
}

interface Props {
  redAlliance: Analysis[]
  blueAlliance: Analysis[]
  schema: Schema
}

interface AllianceProps {
  data: Analysis[]
  name: string
  schema: Schema
}

declare const print: () => void

const Alliance = ({ data, name, schema }: AllianceProps) => (
  <div class={style.alliance}>
    <h2>{name}</h2>
    <table>
      <thead>
        <td />
        {data.map(team => <td>{formatTeamNumber(team.team)}</td>)}
      </thead>

      {Object.keys(schema).map(stat => {
        const isNumber = schema[stat] === 'number'
        return (
          <tr>
            <td>{camelToTitle(stat)}</td>
            {data.map(team => {
              const s = team.stats[stat]
              return <td>{isNumber ? toPrettyNumber(s) : toPercentage(s)}</td>
            })}
          </tr>
        )
      })}
    </table>
  </div>
)

export default ({ eventId, matchId }: PrintProps) => (
  <Resolver
    data={{
      redAlliance: getAllianceAnalysis(eventId, matchId, 'red'),
      blueAlliance: getAllianceAnalysis(eventId, matchId, 'blue'),
      schema: getSchema()
    }}
    render={
      class Print extends Component<Props, {}> {
        constructor() {
          super()
        }
        componentDidUpdate() {
          if (this.props.redAlliance && this.props.blueAlliance) {
            print()
            window.close()
          }
        }
        render({ redAlliance, blueAlliance, schema }: Props) {
          return (
            <div class={style.alliances}>
              <h1>{formatMatchKey(matchId)}</h1>
              {redAlliance !== undefined ? (
                <Alliance name="Red" data={redAlliance} schema={schema} />
              ) : null}
              {blueAlliance !== undefined ? (
                <Alliance name="Blue" data={blueAlliance} schema={schema} />
              ) : null}
            </div>
          )
        }
      }
    }
  />
)
