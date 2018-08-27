var express = require('express');
var router = express.Router();
var {insertUser, updateUser, deleteUser, getLoginUser} = require('../controller/user_c');
/* GET users listing. */
router.put('/:id', updateUser)
      .delete('/:id',deleteUser)
      .get('/',getLoginUser)

module.exports = router;
