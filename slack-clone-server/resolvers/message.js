import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Message: {
        user: ({ userId }, args, { models }) =>
            models.User.findOne({ where: { id: userId } }, { raw: true }),
    },
    Query: {
        message: requiresAuth.createResolver(async (parent, { channelId }, { models }) => {
            messages = await models.Message.findAll(
                { order: [['create_at', 'ASC']], where: { channeldId } },
                { raw: true });
            return messages;
        })
    },
    Mutation: {
        createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                await models.Message.create({ ...args, userId: user.id });
                return true;
            } catch (err) {
                return false;
            }
        })
    }
};