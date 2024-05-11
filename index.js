const express = require('express')
const fs = require("node:fs/promises")
const exphbs = require("express-handlebars")

const app = express()

app.listen(3000, () => console.log("App escuchando puerto 3000"))

// 4. Definir el motor de vistas
app.set ("view engine", "handlebars")
// 4.1 Configurar al motor de vistas
app.engine (
    "handlebars",
    exphbs.engine())

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/crear_usuario", (req, res) => {
  const { nombre, apellido, email, password } = req.query

  const usuario = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password
  }

  fs.readFile("./user/users.json", "utf-8")
    .then(data => {
      let jsonUsers = JSON.parse(data)

      jsonUsers.users.push(usuario)

      fs.writeFile("./user/users.json", JSON.stringify(jsonUsers))
        .then(() => {
          res.send("Usuario Agregado con éxito")
        })
    })

  // const nombreArchivo = `${usuario.nombre}_${usuario.apellido}`
  // fs.writeFile("./user/" + nombreArchivo + ".json", JSON.stringify(usuario))
  //   .then(() => {
  //     res.send("Usuario creado con éxito")
  //   })
  //   .catch(() => {
  //     res.send("Error al crear usuario")
  //   })
})
