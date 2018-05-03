export default {
    Mutation: {
        createTeam: async (parent, args, { models }) => {
            try {
                await models.Team.create(args);
                return true;
            } catch (err) {
                return false;
            }
        }
    }
};