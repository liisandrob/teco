const mongoose = require('mongoose');
const User = require("../models/user");

//Definición del controlador
let userController = {};

//Método API GET - Obtiene toda la lista de usuarios
userController.list = async function (req, res) {
  const users = await User.find();
  console.log(users);
  res.json(users);
};

//Método API GET by id - Obtiene usuario por ID
userController.show = async function (req, res) {
  const { _id, name, last_name, legajo, email, birthday, age } = await User.findById(req.params.id);
  const userEncontrado = { _id, name, last_name, legajo, email, birthday, age };
  res.json(userEncontrado);
};

//Método API POST - Registra nuevo usuario
userController.create = async function (req, res) {
  const formated_birthday = new Date();
  formated_birthday.setTime(Date.parse(req.body.birthday));
  const today = new Date();
  const age = today.getFullYear() - formated_birthday.getFullYear(); //Rescato el año de cada fecha para calcular la edad actual
  const user = new User({
    name: req.body.name,
    last_name: req.body.last_name,
    legajo: req.body.legajo,
    email: req.body.email,
    birthday: Date(req.body.birthday),
    age: age
  });
  await User.findOne({ 'legajo': req.body.legajo }, (err, docs) => {
    if (!docs) { //Verifico que no exista un usuario con el mismo legajo
      user.save((err, docs) => {
        if (!err) {
          res.status(200).send({
            auth: true,
            message: 'usuario registrado'
          });
        } else {
          console.log('Error para registrar usuario ' + JSON.stringify(err, undefined, 2))
        }
      })
    } else {
      console.log('Ya hay un usuairio con legajo ' + req.body.legajo);
      res.status(400).send({
        message: 'Ya hay un usuario con legajo ' + req.body.legajo
      })
    }
  });
};

//Método API PUT by id - Busca usuario por ID y lo actualiza
userController.edit = async function (req, res) {
  const formated_birthday = new Date();
  formated_birthday.setTime(Date.parse(req.body.birthday));
  const today = new Date();
  const age = today.getFullYear() - formated_birthday.getFullYear();
  const { name, last_name, legajo, email, birthday } = req.body;
  const newUser = { name, last_name, legajo, email, birthday, age: age };
  await User.findByIdAndUpdate({ _id: req.body._id }, newUser, { new: true, useFindAndModify: false }, (err, doc) => {
    if (err) {
      console.log("Hubo un error en la actualización");
    } else if (doc) {
      res.status(200).send({
        auth: true,
        message: "se actualizó 1 usuario"
      });
    } else {
      res.status(500).send({
        message: "No se encontró usuario registrado en la base de datos"
      });
    }
    console.log(doc);
  });
};

//CONTROLADOR API DELETE - Busca usuario por ID y lo elimina
userController.delete = async function (req, res) {
  await User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (doc.deletedCount != 0 || doc.n != 0) {
      res.status(200).send({
        message: "exito, se eliminó el usuario"
      })
    } else {
      res.status(500).send({
        message: "error, no se encontró usuario en la base de datos"
      });
    }
  });
};

module.exports = userController;