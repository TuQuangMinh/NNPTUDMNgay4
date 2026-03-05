const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json())

const { dataRole, dataUser } = require("./data")

// ================= ROLE =================

// GET all roles
app.get("/roles", (req, res) => {
  res.json(dataRole)
})

// GET role by id
app.get("/roles/:id", (req, res) => {
  const role = dataRole.find(r => r.id === req.params.id)
  res.json(role)
})

// CREATE role
app.post("/roles", (req, res) => {
  const newRole = req.body
  dataRole.push(newRole)
  res.json(newRole)
})

// UPDATE role
app.put("/roles/:id", (req, res) => {
  const index = dataRole.findIndex(r => r.id === req.params.id)
  if (index !== -1) {
    dataRole[index] = req.body
    res.json(dataRole[index])
  }
})

// DELETE role
app.delete("/roles/:id", (req, res) => {
  const index = dataRole.findIndex(r => r.id === req.params.id)
  if (index !== -1) {
    const deleted = dataRole.splice(index, 1)
    res.json(deleted)
  }
})


// ================= USER =================

// GET all users
app.get("/users", (req, res) => {
  res.json(dataUser)
})

// GET user by username
app.get("/users/:username", (req, res) => {
  const user = dataUser.find(u => u.username === req.params.username)
  res.json(user)
})

// CREATE user
app.post("/users", (req, res) => {
  const newUser = req.body
  dataUser.push(newUser)
  res.json(newUser)
})

// UPDATE user
app.put("/users/:username", (req, res) => {
  const index = dataUser.findIndex(u => u.username === req.params.username)
  if (index !== -1) {
    dataUser[index] = req.body
    res.json(dataUser[index])
  }
})

// DELETE user
app.delete("/users/:username", (req, res) => {
  const index = dataUser.findIndex(u => u.username === req.params.username)
  if (index !== -1) {
    const deleted = dataUser.splice(index, 1)
    res.json(deleted)
  }
})


// ================= SPECIAL API =================

// /roles/:id/users
app.get("/roles/:id/users", (req, res) => {
  const roleId = req.params.id

  const users = dataUser.filter(u => u.role.id === roleId)

  res.json(users)
})


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000")
})