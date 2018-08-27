const router = require('express').Router()
const auth = require('../middleware/isLogin')

const {getArtikel, insertArtikel, updateArtikel, deleteArtikel, getUserArtikel, getOneArticle,addComments, deleteComment} = require('../controller/artikel_c');
router.get('/',getArtikel)
      .post('/',insertArtikel)
      .put('/:id',auth, updateArtikel)
      .delete('/:id',auth, deleteArtikel)
      .get('/userArtikel',auth, getUserArtikel)
      .get('/detailArticle/:id', getOneArticle)
      .put('/comments/:id',auth, addComments)
      .put('/comments/:id/delete',auth, deleteComment)
module.exports = router