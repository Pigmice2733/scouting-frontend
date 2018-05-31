declare module '*.css' {
  const locals: {
    [key: string]: string
  }
  export default locals
}

declare module 'stylelint' {
  export type FormatterType = 'json' | 'string' | 'verbose'
  export type SyntaxType = 'scss' | 'less' | 'sugarss'
  export interface Config {
    extends: string | string[]
    rules: {
      [key: string]: any
    }
  }
  export interface LinterOptions {
    code?: string
    codeFilename?: string
    config?: Config
    configBasedir?: string
    configFile?: string
    configOverrides?: Config
    cache?: boolean
    cacheLocation?: string
    files?: string | string[]
    fix?: boolean
    formatter?: FormatterType
    ignoreDisables?: boolean
    reportNeedlessDisables?: boolean
    ignorePath?: boolean
    syntax?: SyntaxType
    customSyntax?: string
  }

  export interface LinterResult {
    errored: boolean
    output: string
    postcssResults: any[]
    results: LintResult[]
  }
  export interface Warning {
    line: number
    column: number
    rule: string
    severity: 'error' | 'warning'
    text: string
  }
  export interface LintResult {
    source: string
    errored: boolean | undefined
    ignored: boolean | undefined
    warnings: Warning[]
    deprecations: string[]
    invalidOptionWarnings: any[]
  }

  export namespace formatters {
    function json(results: LintResult[]): string
    function string(results: LintResult[]): string
    function verbose(results: LintResult[]): string
  }

  export function lint(options?: LinterOptions): Promise<LinterResult>
}

declare module 'danger-plugin-eslint' {
  export default () => any
}

declare module 'preact-router' {
  import preact from 'preact'

  export function route(url: string, replace?: boolean): boolean
  export function route(options: { url: string; replace?: boolean }): boolean

  export function getCurrentUrl(): string

  export interface Location {
    pathname: string
    search: string
  }

  export interface CustomHistory {
    listen(callback: (location: Location) => void): () => void
    location: Location
    push(path: string): void
    replace(path: string): void
  }

  export interface RoutableProps {
    path?: string
    default?: boolean
  }

  export interface RouterOnChangeArgs {
    router: Router
    url: string
    previous?: string
    active: preact.VNode[]
    current: preact.VNode
  }

  export interface RouterProps extends RoutableProps {
    history?: CustomHistory
    static?: boolean
    url?: string
    onChange?: (args: RouterOnChangeArgs) => void
  }

  export class Router extends preact.Component<RouterProps, {}> {
    canRoute(url: string): boolean
    getMatchingChildren(
      children: preact.VNode[],
      url: string,
      invoke: boolean
    ): preact.VNode[]
    routeTo(url: string): boolean
    render(props: RouterProps): preact.VNode
  }

  export const subscribers: Array<(url: string) => void>

  export interface RouteProps<Props> extends RoutableProps {
    component: preact.AnyComponent<Props>
  }

  export function Route(
    props: ({ default: boolean } | { path: string }) & {
      component: AnyComponent<{ [key: string]: string }>
    }
  ): preact.VNode

  export function Link(
    props: { activeClassName?: string } & JSX.HTMLAttributes
  ): preact.VNode

  declare module 'preact' {
    export interface Attributes extends RoutableProps {}
  }

  export default Router
}
