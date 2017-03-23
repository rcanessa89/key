import UserHandler from '../entities/user/User.handler';

module.exports = function(router) {
    router.route('')
        .post(UserHandler.createUser);
};