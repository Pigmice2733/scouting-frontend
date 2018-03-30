import linkState from 'linkstate'
import { Component, h } from 'preact'
import { route } from 'preact-router'
import { authenticate } from '../../api'
import Button from '../../components/button'
import Header from '../../components/header'
import TextInput from '../../components/text-input'
import { err as errClass, login } from './style.sss'

interface LoginState {
  username: string
  password: string
  error: string
}

class Login extends Component<{}, LoginState> {
  handleLogin = (e: Event) => {
    e.preventDefault()
    authenticate(this.state)
      .then((jwt: string) => {
        localStorage.setItem('jwt', jwt)
        window.history.back()
      })
      .catch(err =>
        this.setState((state: LoginState) => {
          state.error =
            Number(err.message) === 401
              ? 'Incorrect username or password.'
              : err.message
          return state
        })
      )
  }

  render({}, state: LoginState) {
    return (
      <div class={login}>
        <Header title="Login" back="/" />
        <div>
          {state.error ? <p class={errClass}>{state.error}</p> : null}
          <form onSubmit={e => this.handleLogin(e)}>
            <TextInput
              placeholder="Username"
              onInput={linkState(this, 'username')}
              value={state.username}
            />
            <TextInput
              type="password"
              placeholder="Password"
              onInput={linkState(this, 'password')}
              value={state.password}
            />
            <Button type="submit" value="Login" />
          </form>
        </div>
      </div>
    )
  }
}

export default Login
