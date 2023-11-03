const { request } = require('express');
const { 
    getAllUsers,
    getUserById,
    changeUserRoleById,
    createNewUser,
    deleteUserById,
} = require('../../models/users.model');

const { editRolePermissionGranted } = require('../../services/internal');
const { validateInfo } = require('../../services/internal');

async function httpGetAllUsers(req, res) {
    const userId = req.uid;
    const requestingUser = await getUserById(userId)
    // Filter users list based on the requesting user's role and work location
    const users = await getAllUsers(requestingUser.role, requestingUser.location);
    
    return res.status(200).json(users);
}

async function httpGetUserById(req, res) {
    const userId = Number(req.params.id);
    
    const user = await getUserById(userId);
    if (!user) {
        return res.status(404).json({
            error: 'User not found',
        });
    }
    return res.status(200).json(user);
}

async function httpChangeUserRoleById(req, res) {
    const targetId = Number(req.params.id);
    const targetUser = await getUserById(targetId);
    const newRole = req.body.role;
    targetUser.newRole = newRole;

    if (!validateInfo({ role: newRole })) {
        return res.status(400).json({
            error: "Invalid role"
        })
    }

    if (targetUser.role === targetUser.newRole) {
        return res.status(400).json({
            error: "New role is the same as before"
        })
    }

    const requestingUser = await getUserById(req.uid);
    if (!editRolePermissionGranted(requestingUser, targetUser)) {
        return res.status(401).json({
            error: "Permission required"
        });
    }

    const user = await changeUserRoleById(targetId, newRole);
    if (!user) {
        return res.status(500).json({
            error: 'User role not changed'
        });
    }

    return res.status(200).json(user);
}

async function httpAddNewUser(req, res) {
    const user = req.body;
 
    if (!validateInfo({ role: user.role, location: user.location })) {
        return res.status(400).json({
            error: "Invalid role or location"
        })
    }

    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== "Admin" &&
        !(requestingUser.role == "Manager" &&
        requestingUser.location == user.location)) {
        return res.status(401).json({
            error: "Require administrator or location manager access"
        });
    }

    try {
        await createNewUser(user);
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(201).json(user);
}

async function httpDeleteUserById(req, res) {
    const userId = Number(req.params.id);

    const user = await getUserById(userId);
    if (!user) {
        return res.status(404).json({
            error: 'User not found',
        });
    }

    const deleted = await deleteUserById(userId);
    if (!deleted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        });
    }

    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllUsers,
    httpGetUserById,
    httpChangeUserRoleById,
    httpAddNewUser,
    httpDeleteUserById,
};