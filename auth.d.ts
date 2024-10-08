declare module '#auth-utils' {
  interface Usser {
    id?: string
    user: string
    firstName: string
    lastName: string
    birthdate: string
    teacher: boolean
  }

  interface UserSession {
    user: User
    loggedInAt: string
  }
}

export {}
