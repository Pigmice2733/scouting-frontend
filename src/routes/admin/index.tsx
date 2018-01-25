import { h, Component } from 'preact'
import Header from '../../components/header'
import { getUserInfo, camelToTitle } from '../../utils'
import Resolver from '../../resolver'
import { getUsers, getEvents, deleteUser } from '../../api'
import Spinner from '../../components/spinner'
import Button from '../../components/button'
import UserInfo from '../../models/user-info'

interface AdminPanelState {
  users: UserInfo[]
  userInfo: UserInfo
}

class AdminPanel extends Component<any, AdminPanelState> {
  constructor() {
    super()
    this.state = { userInfo: getUserInfo(), users: null }
  }

  componentWillMount() {
    getUsers()(users => this.setState({ users }))
  }

  render(a, { users, userInfo }: AdminPanelState) {
    return (
      <div>
        <Header title={`Admin Panel: ${userInfo.username}`} back="/" />
        {!users ? (
          <Spinner />
        ) : (
          <table>
            <tr>
              <th>Username</th>
              <th>Is Admin</th>
              <th>Delete</th>
            </tr>
            {users.map(user => (
              <tr>
                <td>
                  <input value={user.username} onInput={console.log} />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.isAdmin}
                    onClick={console.log}
                  />
                </td>
                <td>
                  <Button onClick={() => deleteUser(user.username)}>X</Button>
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    )
  }
}

// export default () => {
//   const userInfo = getUserInfo()
//   return (
//     <Resolver
//       data={{
//         users: getUsers()
//       }}
//       render={({ users }) => (
//         <div>
//           <Header title={`Admin Panel: ${userInfo.username}`} back="/" />
//           <table>
//             <tr>
//               <th>Username</th>
//               <th>Is Admin</th>
//               <th>Delete</th>
//             </tr>
//             {users.map(user => (
//               <tr>
//                 <td>
//                   <input value={user.username} onChange={console.log} />
//                 </td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={user.isAdmin}
//                     onClick={console.log}
//                   />
//                 </td>
//                 <td>
//                   <Button onClick={() => deleteUser(user.username)}>X</Button>
//                 </td>
//               </tr>
//             ))}
//           </table>
//         </div>
//       )}
//     />
//   )
// }

export default AdminPanel
