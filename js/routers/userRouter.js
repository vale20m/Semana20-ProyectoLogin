// Colocamos las rutas (o endpoints) sobre los que trabajamos

const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", userController.getUsers);

userRouter.get("/:email", userController.getUserByEmail);

userRouter.post("/", userController.postUser);

userRouter.put("/:email", userController.putUser);

userRouter.delete("/:email", userController.deleteUser);

module.exports = userRouter;