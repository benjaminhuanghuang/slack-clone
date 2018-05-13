/*
    member is a join table between user and user
*/


export default (sequelize) => {
    const Member = sequelize.define('member', {

    });
    return Member;
}