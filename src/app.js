
const { json } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

const DB_Users = [
    {
    "id": 1,
    "firstName": "Alejandra",
    "lastName": "Montaner",
    "email": "alen@hotmail.com",
    "password": "root",
    "age": 30
    },
    {
    "id": 2,
    "firstName": "Javier",
    "lastName": "Trillo",
    "email": "jatrillop@gmail.com",
    "password": "root",
    "age": 31
  }
]

let baseId = 3

app.get('/', (req, res) => {
  res.json({
    message: 'My server is OK!'
  })
})

app.get('/users', (req, res) => {
  res.json(DB_Users)
})

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)

  const data = DB_Users.find((item) => id === item.id)

  if (data) {
    res.json(data)
  } else {
    res.status(404).json({
      message: 'Invalid ID'
    })
  }
})

app.post('/users', (req, res) => {
    const data = req.body
    const addNewUser = {
    id: baseId++,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    age: data.age
    }

    DB_Users.push(addNewUser)
    res.status(201).json(addNewUser)
})

module.exports = app