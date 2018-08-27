var express = require('express');
var router = express.Router();
var images = require('../helpers/images')
var {insertUser, login} = require('../controller/user_c');
/* GET users listing. */
router.post('/register', insertUser)
      .post('/login', login)
      .post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router;
