export default `
    type Team {
        owner: User!
        member: [User!]!
        channels: [Channel!]!
    }

    type Mutation {
        createTeam(name: String!): Boolean!
    }
`
