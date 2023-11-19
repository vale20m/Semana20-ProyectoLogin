// Codigo relacionado con el manejo de la base de datos de los usuarios.

const mariadb = require("mariadb");
const pool = 
mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "semana20api",
    connectionLimit: 5
});

const jwt = require("jsonwebtoken");
const CLAVE_SECRETA = "CLAVE SUPER SECRETA";

// Desarrollamos las funciones para manejar los datos a nivel de base de datos

// Funcion que chequea que el usuario sea correcto para loguearse (lo verifica en una tabla "administradores" de la base de datos)

// Por ahora, el unico administrador es email:"admin" y password:"admin", aunque se podrian agregar mas mediante un POST a esa tabla

const getToken = async (admin) => {
    
    let conn;
    try {
        
        conn = await pool.getConnection();

        const row = await conn.query(
            `SELECT * FROM administradores WHERE email=?`, [admin.email]
        );

        if (row.length == 0){
            return {message: "No existe un administrador con ese email en el sistema"};
        }

        if (row[0].password != admin.password){
            return {message: "La contraseña es incorrecta"};
        }

        const email = admin.email;

        const token = jwt.sign({email}, CLAVE_SECRETA);
        return {token};

    } catch (error) {
        
    }finally {
        if (conn) conn.release();
    }
    return {message: "Se produjo un error"};

}


// Funcion que retorna todos los elementos de la base de datos

const getUsers = async () => {

    let conn;
    try {
        
        conn = await pool.getConnection();

        const rows = await conn.query(
            "SELECT * FROM usuarios"
        );

        if (rows.length == 0){
            return [{message: "No hay usuarios registrados en el sistema"}];
        }

        return rows;

    } catch (error) {
        
    }finally {
        if (conn) conn.release();
    }
    return {message: "Se produjo un error"};

}


// Funcion que retorna el elemento de la base de datos que coincide con ese email

const getUserByEmail = async (email) => {

    let conn;
    try {
        
        conn = await pool.getConnection();

        const row = await conn.query(
            `SELECT * FROM usuarios WHERE email=?`, [email]
        );

        if (row.length == 0){
            return [{message: "No existe un usuario con ese email en el sistema"}];
        }

        return row;
    } catch (error) {
        
    }finally {
        if (conn) conn.release();
    }
    return [{message: "Se produjo un error"}];

}

// Funcion que retorna el usuario agregado a la base de datos.

const postUser = async (user) => {

    let conn;
    try {
        
        conn = await pool.getConnection();

        const check = await conn.query(
            `SELECT * FROM usuarios WHERE email=?`, [user.email]
        );

        if (check.length != 0){
            return [{message: "Ya existe un usuario con ese email en el sistema"}];
        }

        const insert = await conn.query(
            `INSERT INTO usuarios (email, password) VALUES (?, ?)`, [user.email, user.password]
        );
        
        const row = await conn.query(`SELECT * FROM usuarios WHERE email=?`, [user.email]);

        return row;
    } catch (error) {
        
    }finally {
        if (conn) conn.release();
    }
    return [{message: "Se produjo un error"}];

}

// Funcion que actualiza la contraseña del usuario especificado por su email

const putUserPassword = async (email, user) => {

    let conn;
    try {
  
        conn = await pool.getConnection();

        // Chequeamos que el usuario exista

        const check = await conn.query(
            `SELECT * FROM usuarios WHERE email=?`, [email]
        );

        if (check.length == 0){
            return [{message: "No existe un usuario con ese email en el sistema"}];
        }

        // Actualizamos un elemento de la tabla (según su ID)

        const updateUser = await conn.query(`UPDATE usuarios SET password=?
        WHERE email = ?`, [user.password, email]);
        
        // Guardamos el elemento actualizado en una variable

        const updatedUser = await conn.query(`SELECT * FROM usuarios WHERE email=?`, [email]);

        // Mostramos el elemento actualizado

        return updatedUser;
    
    } catch(error) {
    } finally {
        if (conn) conn.release();
    }

    return [{message: "Se produjo un error"}];

}

// Funcion que modifica el email de un usuario si la contraseña es correcta

const putUserEmail = async (email, user) => {

    let conn;
    try {
  
        conn = await pool.getConnection();

        // Chequeamos que el usuario exista

        const check1 = await conn.query(
            `SELECT * FROM usuarios WHERE email=?`, [email]
        );

        if (check1.length == 0){
            return [{message: "No existe un usuario con ese email en el sistema"}];
        }

        // Chequeamos que no haya un usuario con el mismo email al que se quiere cambiar

        const check2 = await conn.query(
            `SELECT * FROM usuarios WHERE email=?`, [user.email]
        );

        if (check2.length != 0){
            return [{message: "Ya existe un usuario con ese email en el sistema"}];
        }

        // Chequeamos que las contraseñas sean iguales

        if (check1[0].password != user.password){
            return [{message: "La contraseña es errónea. Intentelo nuevamente"}]
        }

        // Actualizamos un elemento de la tabla (según su ID)

        const updateUser = await conn.query(`UPDATE usuarios SET email = ?
        WHERE email = ?`, [user.email, email]);
        
        // Guardamos el elemento actualizado en una variable

        const updatedUser = await conn.query(`SELECT * FROM usuarios WHERE email=?`, [user.email]);

        // Mostramos el elemento actualizado

        return updatedUser;
    
    } catch(error) {
    } finally {
        if (conn) conn.release();
    }

    return [{message: "Se produjo un error"}];

}

// Funcion que elimina a un usuario que coincide con el email indicado.

const deleteUser = async (email) => {

    let conn;
    try {
  
        conn = await pool.getConnection();

        // Chequeamos que el usuario exista, y lo mostramos en caso de que exista

        const row = await conn.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);

        if (row.length == 0){
            return [{message: "No existe un usuario con ese email en el sistema"}];
        }

        // Quitamos el elemento de la tabla

        const deleteUser = await conn.query(`DELETE FROM usuarios WHERE email = ?`, [email]);
    
        return row;

    } catch(error) {
    } finally {
        if (conn) conn.release();
    }

    return [{message: "Se produjo un error"}];

}

// Exportamos las funciones

module.exports = {
    getToken,
    getUsers,
    getUserByEmail,
    postUser,
    putUserPassword,
    putUserEmail,
    deleteUser
}