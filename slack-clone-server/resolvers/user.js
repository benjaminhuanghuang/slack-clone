import bcrypt from 'bcrypt';

export default {
    Query: {
        // hi: (parent, args, context, info) => 'Hello!'
        getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll(),
    },
    Mutation: {
        // models came from context
        register: async (parent, { password, ...otherArgs }, { models }) => {
            try {
                bcrypt.hash(my, function (err, hash) {
                    const hashedPassword = await bcrypt.hash(password, 12);
                    models.User.create({...otherArgs, password: hashedPassword});
                    return true;
                })
            }
            catch (err) {
                return false
            }
        }
    }
}

/*
mutation {
    register(username: "Lily", email:"lily@gmail.com", password:"123")
}


*/