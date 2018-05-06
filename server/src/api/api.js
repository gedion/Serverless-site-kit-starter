const express = require('express')
const path = require('path')
const ControllerProfiles = require('../controllers/Profiles')
const app = express()
const config = require('../../../config/dev.env.js');
app.use(require('cors')());

app.use(express.static(path.join(__dirname, '../client/dist')));
const controllerProfiles = new ControllerProfiles(config);
app.get('/profiles', controllerProfiles.get)

app.get('/profile/:id', (req, res) => {
  let p = {
    name: 'Elina Elias',
    nickName: 'Garlic Bread',
    id: 1
  };
  //res.setHeader("Access-Control-Allow-Origin", "*")// Required for CORS support to work
  //res.setHeader("Access-Control-Allow-Credentials", true) // Required for cookies, authorization headers with HTTPS
  res.json(p)
})

module.exports = app
