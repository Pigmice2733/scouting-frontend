import { Component, h } from 'preact'
import { route } from 'preact-router'
import { createUser, deleteUser, getUsers, updateUser } from '../../api'
import Button from '../../components/button'
import Header from '../../components/header'
import Icon from '../../components/icon'
import Spinner from '../../components/spinner'
import TextInput from '../../components/text-input'
import Toggle from '../../components/toggle'
import { User } from '../../models/user'
import { getJWT, getUserInfo, hasValidJWT } from '../../utils'
import style from './style.sss'

class EditableUser {
  username: string
  edit: User

  constructor(username: string, isAdmin: boolean, isVerified: boolean) {
    this.username = username
    this.edit = { username, isAdmin, isVerified, password: '' }
  }
}

interface AdminPanelState {
  users: EditableUser[]
}

class AdminPanel extends Component<{}, AdminPanelState> {
  constructor() {
    super()
  }

  componentWillMount() {
    getUsers()(
      (err, users) =>
        users
          ? this.setState((state: AdminPanelState) => {
              state.users = users.map(
                u => new EditableUser(u.username, u.isAdmin, u.isVerified)
              )
              return state
            })
          : null
    )
  }

  render(_: {}, { users }: AdminPanelState) {
    if (!hasValidJWT(getJWT())) {
      route('/login')
      return null
    }

    const userInfo = getUserInfo()
    return !userInfo.isAdmin ? (
      <p>You are not an admin.</p>
    ) : (
      <div class={style.adminPanel}>
        <Header title={`Admin Panel: ${userInfo.username}`} back="/" />
        {!users ? (
          <Spinner />
        ) : (
          <div class={style.adminInner}>
            <table>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Admin</th>
                <th>Verified</th>
              </tr>
              {users.map((user, i) => {
                const id = `user-${i}`
                return (
                  <tr key={user.username} id={id}>
                    <td>
                      <TextInput
                        placeholder="Username"
                        value={user.edit.username}
                        onInput={evt =>
                          this.setState((state: AdminPanelState) => {
                            state.users[i].edit.username = evt.target.value
                            return state
                          })
                        }
                      />
                    </td>
                    <td>
                      <TextInput
                        value={user.edit.password}
                        type="password"
                        placeholder="Password"
                        onInput={(evt: Event) =>
                          this.setState((state: AdminPanelState) => {
                            const { value } = evt.target as HTMLInputElement
                            state.users[i].edit.password = value
                            return state
                          })
                        }
                      />
                    </td>
                    <td class={style.admin}>
                      <Toggle
                        id={`toggle-admin-${i}`}
                        checked={user.edit.isAdmin}
                        onChange={(evt: Event) =>
                          this.setState((state: AdminPanelState) => {
                            state.users[
                              i
                            ].edit.isAdmin = (evt.target as HTMLInputElement).checked
                            return state
                          })
                        }
                      />
                    </td>
                    <td class={style.admin}>
                      <Toggle
                        id={`toggle-verified-${i}`}
                        checked={user.edit.isVerified}
                        onChange={(evt: Event) =>
                          this.setState((state: AdminPanelState) => {
                            state.users[
                              i
                            ].edit.isVerified = (evt.target as HTMLInputElement).checked
                            return state
                          })
                        }
                      />
                    </td>
                    <td class={style.save}>
                      <Button
                        onClick={() => {
                          const elem = document.getElementById(id)
                          setTimeout(
                            () =>
                              elem.classList.remove(
                                style.failed,
                                style.success
                              ),
                            1200
                          )

                          const re = /[^A-Za-z0-9 ]/
                          if (
                            !user.edit.username ||
                            re.exec(user.edit.username)
                          ) {
                            elem.classList.add(style.failed)
                            return
                          }

                          try {
                            if (user.username !== '') {
                              updateUser(user.username, {
                                username: user.edit.username,
                                isAdmin: user.edit.isAdmin,
                                isVerified: user.edit.isVerified,
                                password: user.edit.password || undefined
                              })
                            } else {
                              createUser(user.edit)
                              user.username = user.edit.username
                            }
                            elem.classList.add(style.success)
                          } catch (ex) {
                            elem.classList.add(style.failed)
                          }
                        }}
                      >
                        Save
                      </Button>
                    </td>
                    <td class={style.delete}>
                      <Button
                        onClick={() => {
                          if (user.username) {
                            deleteUser(user.username)
                          }

                          this.setState((state: AdminPanelState) => {
                            state.users.splice(i, 1)
                          })
                        }}
                      >
                        <Icon icon="delete" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </table>
            <Button
              onClick={() =>
                this.setState((state: AdminPanelState) => {
                  state.users.push(new EditableUser('', false, false))
                  return state
                })
              }
            >
              +
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default AdminPanel
