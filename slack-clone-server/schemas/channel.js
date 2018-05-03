export default `
    type Channel {
        id: Int!
        name: String!
        messages: [Message!]!
        team: Team!
        users: [User!]!
    }
`
