import { tryLogin } from '../auth';
import { addErrorLoggingToSchema } from 'graphql-tools';

import formatErrors from '../formatErrors';

export default {
    Query: {
        // hi: (parent, args, context, info) => 'Hello!'
        getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll(),
    },

    Mutation: {
        login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
            tryLogin(email, password, models, SECRET, SECRET2),

        // models came from context
        register: async (parent, { password, ...otherArgs }, { models }) => {
            try {
                const user = await models.User.create(args);

                return {
                    ok: true,
                    user,
                };
            }
            catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        }
    }
}

/*
mutation {
    register(username: "Lily", email:"lily@gmail.com", password:"123")
}


*/