const express = require("express")

const mysql = require("mysql2")

var app = express()

var bodyParser = require("body-parser")

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Titos_304",
    database: "prueba"
})

con.connect()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"))

app.post("/agregarUsuario", (req, res) => {
    let nombre = req.body.nombre

    con.query("insert into usuario values('" + nombre + "');", (err, respuesta, fields) => {
        if (err) return console.log("Error", err)

        return res.send("<h1>Nombre:" + nombre + "<h1>")
    })


})

app.listen(3000, () => {
    console.log("El servidor escuchando el puerto 3000")

})

app.get("/getusuario", (req, res) => {

    con.query("Select * from usuario", (err, respuesta, field) => {
        if (err) return console.log("Error", err)

        var userHTML = ""
        var i = 0
        console.log(respuesta)
        respuesta.forEach(respuesta => {
            i++
            userHTML += `<tr><td>${i}</td><td>${respuesta.name}</td></tr>`
        })

        return res.send(`<table>
        <tr>
            <td>id</td>
            <td>nombre</td>
        <tr>${userHTML}</tr>
        </table>`)
    })

})

