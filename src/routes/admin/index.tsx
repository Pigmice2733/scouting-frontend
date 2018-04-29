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
import { getUserInfo, hasValidJWT } from '../../utils'
import {
  admin as adminClass,
  adminInner as adminPanelInnerClass,
  adminPanel as adminPanelClass,
  del as deleteClass,
  failed,
  save as saveClass,
  success,
  verify as verifyClass
} from './style.sss'

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
  componentWillMount() {
    getUsers()(
      (err, users) =>
        users !== null
          ? this.setState((state: AdminPanelState) => {
              state.users = users.map(
                u => new EditableUser(u.username, u.isAdmin, u.isVerified)
              )
              return state
            })
          : null
    )
  }

  render({}, { users }: AdminPanelState) {
    if (!hasValidJWT()) {
      route('/login')
      return null
    }

    const userInfo = getUserInfo()
    return (
      <div class={adminPanelClass}>
        <Header
          title={
            userInfo !== null
              ? `Admin Panel: ${userInfo.username}`
              : 'Admin Panel'
          }
          back="/"
        />
        {userInfo === null || users === undefined ? (
          <Spinner />
        ) : !userInfo.isAdmin ? (
          'You are not an admin'
        ) : (
          <div class={adminPanelInnerClass}>
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
                        id={`toggle-admin-${i}`}
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
                    <td class={verifyClass}>
                      <Toggle
                        id={`toggle-verified-${i}`}
                        checked={user.edit.isVerified}
                        onChange={evt =>
                          this.setState((state: AdminPanelState) => {
                            state.users[
                              i
                            ].edit.isVerified = (evt.target as HTMLInputElement).checked
                            return state
                          })
                        }
                      />
                    </td>
                    <td class={saveClass}>
                      <Button
                        onClick={() => {
                          const elem = document.getElementById(id)
                          setTimeout(() => {
                            if (elem !== null) {
                              elem.classList.remove(failed, success)
                            }
                          }, 1200)

                          const re = /[^A-Za-z0-9 ]/
                          if (
                            !user.edit.username ||
                            re.exec(user.edit.username)
                          ) {
                            if (elem !== null) {
                              elem.classList.add(failed)
                            }
                            return
                          }

                          try {
                            if (user.username !== '') {
                              if (user.edit.password === '') {
                                user.edit.password = undefined
                              }
                              updateUser(user.username, user.edit)
                            } else {
                              createUser(user.edit)
                              user.username = user.edit.username
                            }
                            if (elem !== null) {
                              elem.classList.add(success)
                            }
                          } catch (ex) {
                            if (elem !== null) {
                              elem.classList.add(failed)
                            }
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
