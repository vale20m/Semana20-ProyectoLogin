// Colocamos las rutas (o endpoints) sobre los que trabajamos, y que funciones se ejecutaran en cada uno de ellos

const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/login", userController.getToken);

userRouter.get("/usuarios", userController.getUsers);

userRouter.get("/usuarios/:email", userController.getUserByEmail);

userRouter.post("/usuarios", userController.postUser);

userRouter.put("/usuarios/changePassword/:email", userController.putUserPassword);

userRouter.put("/usuarios/changeEmail/:email", userController.putUserEmail);

userRouter.delete("/usuarios/:email", userController.deleteUser);

module.exports = userRouter;