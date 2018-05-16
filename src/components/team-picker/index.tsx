import { h } from 'preact'
import { formatTeamNumber } from '../../utils'
import style from './style.sss'

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
  <label class={style.teamPicker}>
    <span>Team</span>
    <select
      ref={inputRef}
      onChange={(e: Event) => onChange((e.target as HTMLSelectElement).value)}
    >
      {redAlliance.map(t => <option value={t}>{formatTeamNumber(t)}</option>)}
      {blueAlliance.map(t => <option value={t}>{formatTeamNumber(t)}</option>)}
    </select>
  </label>
)

export default TeamPicker
