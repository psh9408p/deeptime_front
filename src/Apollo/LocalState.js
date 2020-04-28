export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false,
}

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token)
      // localStorage.setItem("refresh_count", 0)
      window.location = "/"
      // window.location.reload()
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      })
      return null
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token")
      window.location.reload()
      window.location = "/#/auth"
      return null
    },
  },
}
