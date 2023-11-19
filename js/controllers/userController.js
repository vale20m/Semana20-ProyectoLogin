// Establecemos como se manejan las peticiones

const userModel = require("../models/userModel");

// Manejamos las peticiones GET

const getToken = async (req, res) => {

    const token = await userModel.getToken(req.body);
    res.json(token);

}

const getUsers = async (req, res) => {

    const users = await userModel.getUsers();
    res.json(users);

}

const getUserByEmail = async (req, res) => {

    const user = await userModel.getUserByEmail(req.params.email);
    res.json(user[0]);

}

// Manejamos las peticiones POST

const postUser = async (req, res) => {

    const user = await userModel.postUser(req.body);
    res.json(user[0]);

}

// Manejamos las peticiones PUT

const putUserPassword = async (req, res) => {

    const user = await userModel.putUserPassword(req.params.email, req.body);
    res.json(user[0]);

}

const putUserEmail = async (req, res) => {

    const user = await userModel.putUserEmail(req.params.email, req.body);
    res.json(user[0]);

}

// Manejamos las peticiones DELETE

const deleteUser = async (req, res) => {

    const user = await userModel.deleteUser(req.params.email);
    res.json(user[0]);

}

module.exports = {
    getToken,
    getUsers,
    getUserByEmail,
    postUser,
    putUserPassword,
    putUserEmail,
    deleteUser
}