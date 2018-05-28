import { Component, h } from 'preact'
import Analysis from '../../models/analysis'
import Schema from '../../models/schema'
import {
  camelToTitle,
  compareTeams,
  formatMatchKey,
  formatTeamNumber,
  toPercentage,
  toPrettyNumber
} from '../../utils'
import style from './style.css'

interface TableProps {
  analyses: Analysis[]
  schema: Schema
  eventKey: string
  back: string
}

interface TableState {
  sortBy: string
  reversed: boolean
  selectedTeam: string
}

class Table extends Component<TableProps, TableState> {
  constructor() {
    super()
    this.state = {
      sortBy: 'teamNumber',
      reversed: false,
      selectedTeam: ''
    }
  }

  sortBy = (stat: string) => () =>
    this.setState((state: TableState) => ({
      sortBy: stat,
      reversed: state.sortBy === stat ? !state.reversed : false
    }))

  render(
    { analyses, schema, eventKey, back }: TableProps,
    { sortBy, reversed, selectedTeam }: TableState
  ) {
    return (
      <div class={style.table}>
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
            <th key="notes">
              <span>Notes</span>
            </th>
            <th key="reports">
              <span>Reports</span>
            </th>
          </tr>
          {analyses
            .sort((a, b) => {
              let v: number
              if (
                sortBy === 'teamNumber' ||
                a.stats[sortBy] === b.stats[sortBy]
              ) {
                v = compareTeams(a.team, b.team)
              } else {
                v = a.stats[sortBy] > b.stats[sortBy] ? 1 : -1
              }
              return reversed ? -v : v
            })
            .map(analysis => (
              <tr
                key={analysis.team}
                class={analysis.team === selectedTeam ? style.selectedTeam : ''}
                onClick={() => this.setState({ selectedTeam: analysis.team })}
              >
                <td key="teamNumber">
                  <a
                    href={`/events/${eventKey}/team/${formatTeamNumber(
                      analysis.team
                    )}?back=${back}`}
                  >
                    {formatTeamNumber(analysis.team)}
                  </a>
                </td>
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
                <td key="notes">
                  {Object.keys(analysis.notes).map(
                    key =>
                      analysis.notes[key] ? (
                        <span class={style.note}>
                          {formatMatchKey(key)}: {analysis.notes[key]}
                        </span>
                      ) : null
                  )}
                </td>
                <td key="reports">
                  <span>{analysis.reports}</span>
                </td>
              </tr>
            ))}
        </table>
      </div>
    )
  }
}

export default Table
