var express = require('express')
var router = express.Router()
var Promise = require('bluebird')
var passport = require('passport')
var jwt = require('jwt-simple')
var db = require('../db')

db.createTables()

/* GET home page. */
router.get('/', function(req, res) {
  res.render('../views/api');
});

router.get('/weapons', function(req, res) {
  db.getWeapons().then(function(weapons) {
    res.send(weapons.toJSON())
  }).catch(function(err) {
    res.send(err)
  })
})

router.post('/weapons', function(req, res) {
  db.createWeapons([
    {
      model: 'test 1 weapon',
      damage: 200.5
    },
    {
      model: 'test 2 weapon',
      damage: 500
    }
  ]).then(function(msg) {
    res.send(msg)
  }).catch(function(err) {
    res.send(err)
  })
})



router.get('/users', function(req, res) {
  db.getUsers().then(function(users) {
    res.send(users.toJSON())
  }).catch(function(err) {
    res.send(err)
  })
})

router.post('/users', function(req, res) {
  if (!req.body.password)
    return res.status(500).send('Password missing.')
  if (!req.body.email)
    return res.status(500).send('Email address missing')

  db.createUser({
    local_email: req.body.email,
    local_password: req.body.password
  }).then(function() {
    res.status(200).send()
  }).catch(function(err) {
    res.send(err)
  })
})

module.exports = router;