export default `
    type User {
        id: Int!
        username: String!
        email: String!
        teams: [Team!]!
    }

    type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
    }

    type RegisterResponse {
      ok: Boolean!
      user: User
      errors: [Error!]
    }

    type LoginResponse {
      ok: Boolean!
      token: String
      refreshToken: String
      errors: [Error!]
    }
    
    type Mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse!
        login(email: String!, password: String!): LoginResponse!
    }
`
/*
mutation{
  createUser(username:"ben", email:"ben@gmail.com", password:"abc") {
    id
  }
}
mutation{
  createUser(username:"1ben", email:"1ben@gmail.com", password:"abc") {
    id,
    username
  }
}

{
  getUser(id: 3) {
    username
    email
  }
}
*/