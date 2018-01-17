import { h, Component } from 'preact'
import { authenticate } from '../../api'
import linkState from 'linkstate'
import { route } from 'preact-router'
import Header from '../../components/header'
import TextInput from '../../components/text-input'
import Button from '../../components/button'
import { login } from './style.sss'

interface LoginProps {
  back: string
}

interface LoginState {
  username: string
  password: string
  error: string
}

class Login extends Component<LoginProps, LoginState> {
  handleLogin = (e: Event, back: string) => {
    e.preventDefault()
    authenticate(this.state)
      .then((jwt: string) => {
        localStorage.setItem('jwt', jwt)
        route(back || '/')
      })
      .catch(err => this.setState({ error: err.toString() }))
  }

  render({ back }: LoginProps, state: LoginState) {
    return (
      <div class={login}>
        <Header title="Login" back={back || '/'} />
        {state.error ? <p>{state.error}</p> : null}
        <form onSubmit={e => this.handleLogin(e, back)}>
          <TextInput
            onInput={linkState(this, 'username')}
            value={state.username}
          />
          <TextInput
            type="password"
            onInput={linkState(this, 'password')}
            value={state.password}
          />
          <Button type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default Login
