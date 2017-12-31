import {
  h,
  Component,
  ComponentConstructor,
  FunctionalComponent,
  ComponentProps
} from 'preact'

interface ResolverProps<T> {
  data: { [K in keyof T]: Promise<T[K]> } & { [key: string]: Promise<any> }
  render: FunctionalComponent<T> | ComponentConstructor<T, any>
}

interface ResolverState {
  data: any
}

const Resolver = <T extends {}>(props: ResolverProps<T>) =>
  h(
    class extends Component<ResolverProps<T>, ResolverState> {
      constructor(props: ResolverProps<T>) {
        super()
        this.state = { data: {} }

        Object.keys(props.data).forEach(prop => {
          if (prop === 'children') return

          props.data[prop].then((d: any) =>
            this.setState((state: ResolverState) => {
              state.data[prop] = d
            })
          )
        })
      }

      render(
        { render }: any,
        { data }: { data: { match: number; event: number } }
      ) {
        return h(render, data)
      }
    },
    props
  )

export default Resolver
