import { h } from 'preact'
import { teamPicker } from './style.sss'
import { formatTeamNumber } from '../../utils'

interface TeamPickerProps {
  onChange: (team: string) => any
  redAlliance: string[]
  blueAlliance: string[]
}

const TeamPicker = ({
  onChange,
  redAlliance,
  blueAlliance
}: TeamPickerProps) => (
  <label class={teamPicker}>
    <h2>Team</h2>
    <select onChange={e => onChange(e.target.value)}>
      {redAlliance.map(t => <option value={t}>{formatTeamNumber(t)}</option>)}
      {blueAlliance.map(t => <option value={t}>{formatTeamNumber(t)}</option>)}
    </select>
  </label>
)

export default TeamPicker
