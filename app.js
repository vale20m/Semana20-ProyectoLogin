// Guardamos los frameworks necesarios y declaramos el puerto

const express = require("express");
const app = express();

// Utilizamos el JSONWebToken

const jwt = require("jsonwebtoken");
const CLAVE_SECRETA = "CLAVE SUPER SECRETA";

const userRouter = require("./js/routers/userRouter");

const port = 3000;

// Hacemos que el app trabaje con JSON

app.use(express.json());

// Hacemos que se trabaje con el puerto elegido

app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("<h1>Bienvenid@ al sistema!</h1>")
});


// Verificamos que el usuario este autorizado mediante el token en el encabezado

app.use("/usuarios", (req, res, next) => {

    try {
        const decoded = jwt.verify(req.headers["access-token"], CLAVE_SECRETA);
        next();
    } catch (error) {
        res.status(401).json({ message: "Usuario no autorizado" })
    }

});



// Una vez verificado el login, se pueden realizar las diferentes acciones sobre los usuarios

app.use("/", userRouter);

