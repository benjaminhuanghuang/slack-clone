export default `
    type Team {
        owner: User!
        member: [User!]!
        channels: [Channel!]!
    }
`
