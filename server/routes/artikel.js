const router = require('express').Router()
const {getArtikel, insertArtikel, updateArtikel, deleteArtikel} = require('../controller/artikel_c');
router.get('/',getArtikel)
      .post('/',insertArtikel)
      .put('/:id',updateArtikel)
      .delete('/:id',deleteArtikel)
module.exports = router