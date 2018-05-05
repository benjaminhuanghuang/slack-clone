import bcrypt from 'bcrypt';
import _ from 'lodash';
import { tryLogin } from '../auth';
import { addErrorLoggingToSchema } from 'graphql-tools';

const formatErrors = (e, models) => {
    if (e instanceof models.sequelize.ValidationError) {
        //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
        return e.errors.map(x => _.pick(x, ['path', 'message']));
    }
    return [{ path: 'name', message: 'something went wrong' }];
};

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