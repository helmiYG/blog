var express = require('express');
var router = express.Router();

var {insertUser, login} = require('../controller/user_c');
/* GET users listing. */
router.post('/regsiter', insertUser)
      .post('/login', login)

module.exports = router;
