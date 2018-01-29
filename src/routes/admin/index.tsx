import { h, Component } from 'preact'
import Header from '../../components/header'
import { getUserInfo, hasValidJWT } from '../../utils'
import Resolver from '../../resolver'
import {
  getUsers,
  getEvents,
  deleteUser,
  updateUser,
  createUser
} from '../../api'
import Spinner from '../../components/spinner'
import Button from '../../components/button'
import UserInfo from '../../models/user-info'
import Icon from '../../components/icon'
import Toggle from '../../components/toggle'
import TextInput from '../../components/text-input'
import {
  adminPanel as adminPanelClass,
  del as deleteClass,
  failed,
  success
} from './style.sss'
import { route } from 'preact-router'

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

class AdminPanel extends Component<any, AdminPanelState> {
  constructor() {
    super()
  }

  componentWillMount() {
    getUsers()(
      users =>
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
    }

    const userInfo = getUserInfo()
    return !userInfo.isAdmin ? (
      <p>You are not an admin.</p>
    ) : (
      <div>
        <Header title={`Admin Panel: ${userInfo.username}`} back="/" />
        {!users ? (
          <Spinner />
        ) : (
          <div class={adminPanelClass}>
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
                        onInput={evt =>
                          this.setState((state: AdminPanelState) => {
                            state.users[i].edit.password = evt.target.value
                            return state
                          })
                        }
                      />
                    </td>
                    <td>
                      <Toggle
                        id={`toggle-${i}`}
                        checked={user.edit.isAdmin}
                        onChange={evt =>
                          this.setState((state: AdminPanelState) => {
                            state.users[i].edit.isAdmin = evt.target.checked
                            return state
                          })
                        }
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          const elem = document.getElementById(id)
                          setTimeout(
                            () => elem.classList.remove(failed, success),
                            200
                          )

                          try {
                            if (user.username != '') {
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
                    <td>
                      <Button
                        class={deleteClass}
                        onClick={() => deleteUser(user.username)}
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
