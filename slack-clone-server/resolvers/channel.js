import formatErrors from '../formatErrors';

export default {
    Mutation: {
        createChannel: async (parent, args, { models }) => {
            try {
                await models.Channel.create(args);
                return {
                    ok: true,
                    channle
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models)
                };
            }
        }
    }
};