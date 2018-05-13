export default `
    type Message {
        id: Int!
        text: String!
        user: User!
        channel: Channel!
    }

    type Query {
        message(channelId:Int!): [Message!]!
    }

    type Mutation {
        createMessage(channelId: Int!, text: String!): Boolean!
    }
`
