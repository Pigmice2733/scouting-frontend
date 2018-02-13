import {
  h,
  Component,
  ComponentConstructor,
  FunctionalComponent,
  ComponentProps
} from 'preact'
import { err as errClass } from './error.sss'

interface ResolverProps<T> {
  data: {
    [K in keyof T]: (d: (error: Error | null, d: T[K]) => any) => any
  } & {
    [key: string]: any
  }
  render: FunctionalComponent<T> | ComponentConstructor<T, any>
}

interface ResolverState {
  data: any
  error: Error | null
}

const Resolver = <T extends {}>(props: ResolverProps<T>) =>
  h(
    class extends Component<ResolverProps<T>, ResolverState> {
      constructor(props: ResolverProps<T>) {
        super()
        this.state = { data: {}, error: null }

        Object.keys(props.data).forEach(prop => {
          if (prop === 'children') {
            return
          }

          props.data[prop]((err: Error, d: any) =>
            this.setState((state: ResolverState) => {
              if (err !== null) {
                return this.setState({ error: err })
              }
              state.data[prop] = d
              return state
            })
          )
        })
      }

      render({ render }: ResolverProps<T>, { error, data }: ResolverState) {
        const Render = render
        return (
          <div>
            {error !== null ? (
              <p class={errClass}>
                Network Connection Problem: {error.toString()}
              </p>
            ) : null}
            <Render {...data} />
          </div>
        )
      }
    },
    props
  )

export default Resolver
