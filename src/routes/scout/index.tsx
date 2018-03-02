import { h, Component } from 'preact'
import { route } from 'preact-router'
import linkState from 'linkstate'

import FRCEvent from '../../models/frc-event'
import Match from '../../models/match'
import Schema from '../../models/schema'

import { getEvent, getMatch, getSchema, submitReport } from '../../api'
import {
  camelToTitle,
  hasValidJWT,
  sortSchemaKeys,
  capitalize
} from '../../utils'

import Resolver from '../../resolver'

import Header from '../../components/header'
import Toggle from '../../components/toggle'
import NumberPicker from '../../components/number-picker'
import TextInput from '../../components/text-input'
import Button from '../../components/button'
import TeamPicker from '../../components/team-picker'

import { scout, fields, scoutMain, notes } from './style.sss'

interface ScoutProps {
  event: FRCEvent
  match: Match
  schema: Schema
}

interface ScoutState {
  team: string
  report: {
    [key: string]: number | boolean
  }
  notes: string
}

const Field = ({
  fieldType,
  fieldName,
  self
}: {
  fieldType: string
  fieldName: string
  self: any
}) => (
  <label for={fieldName}>
    <span>
      {camelToTitle(fieldName.replace('auto', '').replace('teleop', ''))}
    </span>
    {fieldType === 'bool' ? (
      <Toggle
        onChange={linkState(self, `report.${fieldName}`, 'target.checked')}
        checked={self.state.report[fieldName]}
        id={fieldName}
      />
    ) : fieldType === 'number' ? (
      <NumberPicker
        onChange={linkState(self, `report.${fieldName}`)}
        id={fieldName}
      />
    ) : (
      <div>Unrecognized Field Type for {fieldName}</div>
    )}
  </label>
)

const Scout = ({ eventId, matchId }: { eventId: string; matchId: string }) => {
  if (!hasValidJWT()) {
    route(`/login?back=/events/${eventId}/${matchId}/scout`, true)
    return
  }
  return (
    <Resolver
      data={{
        event: getEvent(eventId),
        match: getMatch(eventId, matchId),
        schema: getSchema()
      }}
      render={
        class extends Component<ScoutProps, ScoutState> {
          constructor() {
            super()
            this.state = {
              report: {},
              team: '',
              notes: ''
            }
          }
          submit = () => {
            console.log(this.state.names, this.state.notes !== '')
            submitReport(
              this.state.team || this.props.match.redAlliance[0],
              eventId,
              matchId,
              this.state.report,
              this.state.notes !== '' ? this.state.notes : undefined
            ).then(() => route(`/events/${eventId}/${matchId}`))
          }
          changeTeam = (team: string) => {
            this.setState({ team })
          }
          render({ event, match, schema }: ScoutProps, { report }: ScoutState) {
            const eventName = (event && event.shortName) || eventId
            if (schema && Object.keys(report).length === 0) {
              this.setState((state: ScoutState) => {
                Object.keys(schema).map(fieldName => {
                  const fieldType = schema[fieldName]
                  if (!state.report[fieldName]) {
                    state.report[fieldName] = fieldType === 'bool' ? false : 0
                  }
                })
                return state
              })
            }

            const sortedKeys = sortSchemaKeys(Object.keys(schema || []))
            return (
              <div class={scout}>
                <Header
                  title={`Scout - ${matchId.toUpperCase()} - ${eventName}`}
                  back={`/events/${eventId}/${matchId}`}
                />
                <div class={scoutMain}>
                  {match && (
                    <TeamPicker
                      onChange={this.changeTeam}
                      redAlliance={match.redAlliance}
                      blueAlliance={match.blueAlliance}
                    />
                  )}
                  {['auto', 'teleop', 'general'].map(sectionName => (
                    <div class={fields}>
                      <h2>{capitalize(sectionName)}</h2>
                      {sortedKeys[sectionName].map(fieldName => (
                        <Field
                          fieldName={fieldName}
                          fieldType={schema[fieldName]}
                          self={this}
                        />
                      ))}
                    </div>
                  ))}
                  <TextInput
                    placeholder="Notes"
                    value={this.state.notes}
                    onInput={e =>
                      this.setState((state: ScoutState) => {
                        state.notes = e.target.value
                        return state
                      })
                    }
                    className={notes}
                  />
                  <Button onClick={this.submit}>Submit Report</Button>
                </div>
              </div>
            )
          }
        }
      }
    />
  )
}

export default Scout
