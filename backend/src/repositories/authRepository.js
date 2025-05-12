const User = require('../models/User')

exports.register = async (user) => {
    try {
        const newUser = await User.create(user)

        return newUser;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.login = async (email) => {
    try {
        const user = await User.findOne({ where: { email }});

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}