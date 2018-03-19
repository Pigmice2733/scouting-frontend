import {
  Component,
  ComponentConstructor,
  ComponentProps,
  FunctionalComponent,
  h
} from 'preact'
import { err as errClass, wrapper as wrapperClass } from './error.sss'

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
      constructor(p: ResolverProps<T>) {
        super()
        this.state = { data: {}, error: null }

        Object.keys(p.data).forEach(prop => {
          if (prop === 'children') {
            return
          }

          p.data[prop]((err: Error, d: any) =>
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
          <div class={wrapperClass}>
            {error !== null ? (
              <div class={errClass}>
                Network Connection Problem: {error.toString()}
              </div>
            ) : null}
            <Render {...data} />
          </div>
        )
      }
    },
    props
  )

export default Resolver
