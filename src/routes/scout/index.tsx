import linkState from 'linkstate'
import { Component, h } from 'preact'
import { route } from 'preact-router'

import FRCEvent from '../../models/frc-event'
import Match from '../../models/match'
import Schema from '../../models/schema'

import { getEvent, getMatch, getSchema, submitReport } from '../../api'
import {
  camelToTitle,
  capitalize,
  getJWT,
  hasValidJWT,
  sortSchemaKeys
} from '../../utils'

import Resolver from '../../resolver'

import Button from '../../components/button'
import Header from '../../components/header'
import NumberPicker from '../../components/number-picker'
import TeamPicker from '../../components/team-picker'
import TextInput from '../../components/text-input'
import Toggle from '../../components/toggle'

import style from './style.css'

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
  key?: string
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
      <NumberPicker onChange={linkState(self, `report.${fieldName}`)} />
    ) : (
      <div>Unrecognized Field Type for {fieldName}</div>
    )}
  </label>
)

const Scout = ({ eventId, matchId }: { eventId: string; matchId: string }) => {
  if (!hasValidJWT(getJWT())) {
    route(`/login`, true)
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
          teamPicker: HTMLSelectElement = null

          constructor() {
            super()
            this.state = {
              report: {},
              team: '',
              notes: ''
            }
          }
          submit = async () => {
            await submitReport(
              this.state.team || this.teamPicker.value,
              eventId,
              matchId,
              this.state.report,
              this.state.notes !== '' ? this.state.notes : undefined
            )
            route(`/events/${eventId}/${matchId}`)
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
              <div class={style.scout}>
                <Header
                  title={`Scout - ${matchId.toUpperCase()} - ${eventName}`}
                  back={`/events/${eventId}/${matchId}`}
                  verify
                />
                <div class={style.scoutMain}>
                  {match && (
                    <TeamPicker
                      onChange={this.changeTeam}
                      redAlliance={match.redAlliance}
                      blueAlliance={match.blueAlliance}
                      inputRef={e => (this.teamPicker = e)}
                    />
                  )}
                  {['auto', 'teleop', 'general'].map(sectionName => (
                    <div class={style.fields} key={sectionName}>
                      <h2>{capitalize(sectionName)}</h2>
                      {sortedKeys[sectionName].map(fieldName => (
                        <Field
                          key={fieldName}
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
                    className={style.notes}
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
