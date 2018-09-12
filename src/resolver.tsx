import { Component, ComponentConstructor, FunctionalComponent, h } from 'preact'
import style from './error.css'

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
    class InnerResolver extends Component<ResolverProps<T>, ResolverState> {
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
          <div class={style.wrapper}>
            {error !== null ? (
              <div class={style.err}>
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
