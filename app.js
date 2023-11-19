// Guardamos los frameworks necesarios y declaramos el puerto

const express = require("express");
const app = express();

const userRouter = require("./js/routers/userRouter");

const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("<h1>Bienvenid@ al sistema!</h1>")
});

app.use("/usuarios", userRouter);

