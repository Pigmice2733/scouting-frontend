import { h, Component } from 'preact'

const wrap = (Child, dataRequest) =>
  class Wrap extends Component {
    constructor(props) {
      super()
      this.state = { data: {} }
      const requestedData = dataRequest(props)
      Object.keys(requestedData)
        .map(key => ({ key, promise: requestedData[key] }))
        .forEach(({ key, promise }) =>
          promise.then(d => this.setState(state => (state.data[key] = d)))
        )
    }

    render(props, { data }) {
      return <Child data={data} {...props} />
    }
  }

export default wrap
