const express = require("express")
const mysql = require("mysql2")
const port = require("config.js")
var app = express()
var bodyParser = require("body-parser")
var dbpareser = require("parse-database-url")
const { PORT } = require("./config")

const dburl = "mysql://root:Q65HGWdKtKO57OluB8is@containers-us-west-92.railway.app:7783/railway"

var dbconfig = dbpareser(dburl)

var con = mysql.createConnection(dbconfig)

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

app.listen(port, () => {
    console.log(`El servidor escuchando el puerto ${port}`)

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

