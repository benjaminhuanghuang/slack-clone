export default `
    type Team {
        owner: User!
        member: [User!]!
        channels: [Channel!]!
    }

    type Channel {
        id: Int!
        name: String!
        messages: [Message!]!
        team: Team!
        users: [User!]!
    }

    type Message {
        id: Int!
        text: String!
        user: User!
        channel: Channel!
    }

    type User {
        id: Int!
        username: String!
        email: String!
        teams: [Team!]!
    }
    type Query{
        hi: String
    }
`;