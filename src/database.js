const mongoose = require('mongoose');

const URI = 'mongodb://localhost/usuarios-teco'

mongoose.connect(URI,  {
    useNewUrlParser:true, 
    useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;