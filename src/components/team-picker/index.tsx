import { h } from 'preact'
import { teamPicker } from './style.sss'
import { formatTeamNumber } from '../../utils'

interface TeamPickerProps {
  onChange: (team: string) => any
  redAlliance: string[]
  blueAlliance: string[]
  inputRef: (input: HTMLSelectElement) => any
}

const TeamPicker = ({
  onChange,
  redAlliance,
  blueAlliance,
  inputRef
}: TeamPickerProps) => (
  <label class={teamPicker}>
    <span>Team</span>
    <select
      ref={inputRef}
      onChange={e => onChange((e.target as HTMLSelectElement).value)}
    >
      {redAlliance.map(t => <option value={t}>{formatTeamNumber(t)}</option>)}
      {blueAlliance.map(t => <option value={t}>{formatTeamNumber(t)}</option>)}
    </select>
  </label>
)

export default TeamPicker
