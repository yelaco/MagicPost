const axios = require('axios');

const User = require('./users.mongo');

const DEFAULT_USER_ID = 0;

async function getAllUsers() {
    return await usersDatabase
        .find()
        .sort()
        .skip()
        .limit()
};

async function getUserById(userId) {
    
}

async function changeUserRoleById(userId) {

}

async function getLatestUserId() {
    const latestUser = await User
        .findOne()
        .sort('-userId');
    if (!latestUser) {
        return DEFAULT_USER_ID;
    }

    return latestUser.userId;
}

async function saveUser(user) {
    await User.create(user);
}

async function createNewUser(user) {
    const existedUser = await User.findOne({ 'email': `${user.email}` });
    if (existedUser) {
        throw new Error(`The email ${existedUser.email} has already been used for other account`);
    }
    const newUserId = await getLatestUserId() + 1; 
    const newUser = Object.assign(user, {
        userId: newUserId,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        password: "hash-later",
    })
    await saveUser(newUser);
}

async function deleteUserById(userId) {

}

module.exports = {
    getAllUsers,
    getUserById,
    changeUserRoleById,
    createNewUser,
    deleteUserById,
}