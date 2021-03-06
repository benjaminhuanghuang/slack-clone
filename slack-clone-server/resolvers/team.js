import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {
        allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
            models.Team.findAll({ where: { owner: user.id } }, { raw: true })),
        // Inner join
        // inviteTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
        //     models.Team.findAll({ 
        //         include:[
        //             {
        //                 model: models.User,
        //                 where: {id: user.id}
        //             }
        //         ]
        //     }, { raw: true })),
        inviteTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
            models.sequelize.query('select * from team join members on id = team_id where user_id = ?',
                {
                    replacements: [user.id],
                    model: models.Team
                })),
    },
    Mutation: {
        createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                // sequelize transaction
                const response = await models.sequelize.transaction(async () => {
                    const team = await models.Team.create({ ...args, owner: user.id });
                    // create default channel for team
                    await models.Channel.create({ name: 'general', public: true, teamId: team.id });
                    return team;
                });
                return {
                    ok: true,
                    team: response,
                };
            } catch (err) {
                console.log(err);
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        }),

        addTeamMember: requiresAuth.createResolver(async (parent, { email, team }, { models, user }) => {
            try {
                const teamPromise = models.Team.findOne({ where: { id: teamId } }, { raw: true });
                const userToAddPromise = models.User.findOne({ where: { email } }, { raw: true });
                // Make synchronous
                const [team, userToAdd] = await Promise.all([teamPromise, userToAddPromise]);
                if (team.owner !== user.id) {
                    return {
                        ok: false,
                        errors: [{ path: 'email', message: 'You cannot add members to the team' }],
                    };
                }
                if (!userToAdd) {
                    return {
                        ok: false,
                        errors: [{ path: 'email', message: 'Could not find user with this email' }],
                    };
                }
                await models.Member.create({ userId: userToAdd.id, teamId });
                return {
                    ok: true,
                };
            } catch (err) {
                console.log(err);
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        }),
    },
    Team: {
        channels: ({ id }, args, { models }) => models.Channel.findAll({ teamId: id }),
        directMessageMembers: ({ id }, args, { models, user }) =>
            models.sequelize.query(
                'select distinct on (u.id) u.id, u.username from users as u join direct_messages as dm on (u.id = dm.sender_id) or (u.id = dm.receiver_id) where (:currentUserId = dm.sender_id or :currentUserId = dm.receiver_id) and dm.team_id = :teamId',
                {
                    replacements: { currentUserId: user.id, teamId: id },
                    model: models.User,
                    raw: true,
                },
            ),
    },
};