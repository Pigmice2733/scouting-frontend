import { h, Component } from 'preact'
import Analysis from '../../models/analysis'
import Schema from '../../models/schema'
import {
  camelToTitle,
  toPercentage,
  toPrettyNumber,
  formatTeamNumber,
  sortTeams
} from '../../utils'
import { table, statColumn } from './style.sss'

interface TableProps {
  analyses: Analysis[]
  schema: Schema
}

interface TableState {
  sortBy: string
  reversed: boolean
}

class Table extends Component<TableProps, TableState> {
  constructor() {
    super()
    this.state = {
      sortBy: 'teamNumber',
      reversed: false
    }
  }

  sortBy = (stat: string) => () =>
    this.setState((state: TableState) => ({
      sortBy: stat,
      reversed: state.sortBy === stat ? !state.reversed : false
    }))

  render({ analyses, schema }: TableProps, { sortBy, reversed }: TableState) {
    return (
      <div class={table}>
        <table>
          <tr>
            <th key="teamNumber" onClick={this.sortBy('teamNumber')}>
              <div>
                <span>
                  {sortBy === 'teamNumber' && (reversed ? ' ▲' : ' ▼')}Team
                </span>
              </div>
            </th>
            {schema &&
              Object.keys(schema).map(stat => (
                <th key={stat} onClick={this.sortBy(stat)}>
                  <div>
                    <span>
                      {sortBy === stat && (reversed ? ' ▲' : ' ▼')}
                      {camelToTitle(stat)}
                    </span>
                  </div>
                </th>
              ))}
          </tr>
          {analyses
            .sort((a, b) => {
              const v =
                sortBy === 'teamNumber'
                  ? sortTeams(a.team, b.team) ? 1 : -1
                  : a.stats[sortBy] > b.stats[sortBy] ? 1 : -1
              return reversed ? -v : v
            })
            .map(analysis => (
              <tr key={analysis.team}>
                <td key="teamNumber">{formatTeamNumber(analysis.team)}</td>
                {schema &&
                  Object.keys(schema).map(stat => {
                    const s = analysis.stats[stat]
                    return (
                      <td key={stat}>
                        {schema[stat] === 'number'
                          ? toPrettyNumber(s)
                          : toPercentage(s)}
                      </td>
                    )
                  })}
              </tr>
            ))}
        </table>
      </div>
    )
  }
}

export default Table
