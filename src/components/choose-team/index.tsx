import { Component, h } from 'preact'

interface Props {
  render: (props: { onClick: () => void }) => JSX.Element
  onChoose: (team: string) => any
  choices: string[]
}

interface State {
  visible: boolean
}

export default class ChooseTeam extends Component<Props, State> {
  state = { visible: false }

  handleChoose = (team: string) => () => {
    this.props.onChoose(team)
    this.setState({ visible: false })
  }

  render(
    { render: RenderButton, choices, onChoose }: Props,
    { visible }: State
  ) {
    if (!visible) {
      return <RenderButton onClick={() => this.setState({ visible: true })} />
    }
    return (
      <div>
        {choices.map(c => <h2 onClick={this.handleChoose(c)}>Choice {c}</h2>)}
      </div>
    )
  }
}
