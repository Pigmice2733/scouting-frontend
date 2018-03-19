import { Component, h } from 'preact'
import { route } from 'preact-router'
import {
  createUser,
  deleteUser,
  getEvents,
  getUsers,
  updateUser
} from '../../api'
import Button from '../../components/button'
import Header from '../../components/header'
import Icon from '../../components/icon'
import Spinner from '../../components/spinner'
import TextInput from '../../components/text-input'
import Toggle from '../../components/toggle'
import UserInfo from '../../models/user-info'
import Resolver from '../../resolver'
import { getUserInfo, hasValidJWT } from '../../utils'
import {
  admin as adminClass,
  adminInner as adminPanelInnerClass,
  adminPanel as adminPanelClass,
  del as deleteClass,
  failed,
  save as saveClass,
  success
} from './style.sss'

class EditableUser {
  username: string
  edit: UserInfo & { password: string }

  constructor(username: string, isAdmin: boolean) {
    this.username = username
    this.edit = { username, isAdmin, password: '' }
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
                u => new EditableUser(u.username, u.isAdmin)
              )
              return state
            })
          : null
    )
  }

  render({}, { users }: AdminPanelState) {
    if (!hasValidJWT()) {
      route('/login')
      return
    }

    const userInfo = getUserInfo()
    return !userInfo.isAdmin ? (
      <p>You are not an admin.</p>
    ) : (
      <div class={adminPanelClass}>
        <Header title={`Admin Panel: ${userInfo.username}`} back="/" />
        {!users ? (
          <Spinner />
        ) : (
          <div class={adminPanelInnerClass}>
            <table>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Admin</th>
              </tr>
              {users.map((user, i) => {
                const id = `user-${i}`
                return (
                  <tr id={id}>
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
                        onInput={evt =>
                          this.setState((state: AdminPanelState) => {
                            state.users[i].edit.password = evt.target.value
                            return state
                          })
                        }
                      />
                    </td>
                    <td class={adminClass}>
                      <Toggle
                        id={`toggle-${i}`}
                        checked={user.edit.isAdmin}
                        onChange={evt =>
                          this.setState((state: AdminPanelState) => {
                            state.users[
                              i
                            ].edit.isAdmin = (evt.target as HTMLInputElement).checked
                            return state
                          })
                        }
                      />
                    </td>
                    <td class={saveClass}>
                      <Button
                        onClick={() => {
                          const elem = document.getElementById(id)
                          setTimeout(
                            () => elem.classList.remove(failed, success),
                            1200
                          )

                          const re = /[^A-Za-z0-9 ]/
                          if (
                            !user.edit.username ||
                            re.exec(user.edit.username)
                          ) {
                            elem.classList.add(failed)
                            return
                          }

                          try {
                            if (user.username !== '') {
                              updateUser(user.username, {
                                username: user.edit.username,
                                isAdmin: user.edit.isAdmin,
                                password: user.edit.password
                                  ? user.edit.password
                                  : undefined
                              })
                            } else {
                              createUser(user.edit)
                              user.username = user.edit.username
                            }
                            elem.classList.add(success)
                          } catch (ex) {
                            elem.classList.add(failed)
                          }
                        }}
                      >
                        Save
                      </Button>
                    </td>
                    <td class={deleteClass}>
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
                  state.users.push(new EditableUser('', false))
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
