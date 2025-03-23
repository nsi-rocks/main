declare module '#auth-utils' {
  interface User {
    id?: string
    user: string
    firstName: string
    lastName: string
    birthdate: string
    teacher: boolean
    classes: string
  }

  interface UserSession {
    user: User
    loggedInAt: string
  }
}

export {}
