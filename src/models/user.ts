interface UserInfo {
  username: string
  isAdmin: boolean
}

interface User {
  username: string
  password?: string
  isAdmin: boolean
  isVerified: boolean
}

export { User, UserInfo }
