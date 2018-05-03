export default {
    Query: {
        // hi: (parent, args, context, info) => 'Hello!'
        getUser: (parent, {id}, {models}) => models.User.findOne({where: {id}}),
        allUsers: (parent, args, {models}) => models.User.findAll(),
    },
    Mutation: {
        // models came from context
        createUser: (parent, args, {models}) => models.User.create(args),
    }
}