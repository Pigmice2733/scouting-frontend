import { h, Component, ComponentConstructor, FunctionalComponent } from 'preact'

interface WrapProps {}

interface WrapState {
  data: any
}

interface DataRequest {
  (props: any): {
    [key: string]: Promise<any>
  }
}

const wrap = (
  Child: ComponentConstructor<any, any> | FunctionalComponent<any>,
  dataRequest: DataRequest
) =>
  class Wrap extends Component<WrapProps, WrapState> {
    state: WrapState

    constructor(props: WrapProps) {
      super()
      this.state = { data: {} }
      const requestedData = dataRequest(props)
      Object.keys(requestedData)
        .map(key => ({ key, promise: requestedData[key] }))
        .forEach(({ key, promise }) =>
          promise.then(d =>
            this.setState((state: WrapState) => (state.data[key] = d))
          )
        )
    }

    render(props: WrapProps, { data }: WrapState) {
      return <Child data={data} {...props} />
    }
  }

export default wrap
