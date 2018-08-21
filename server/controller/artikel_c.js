const Artikel = require('../models/artikel');

module.exports = {
    getArtikel: (req, res) =>{
        Artikel.find()
        .then((result) => {
            res.status(200).json({
                result
            })
        })
        .catch((err) => {
            res.status(500)
        });
    },
    insertArtikel: (req, res) =>{
        Artikel.create({
            title: req.body.title,
            category: req.body.category,
            userId: req.body.userId
        })
        .then((result) => {
            res.status(201).json({
                result
            })
        })
        .catch((err) => {
            res.status(500)
        });
    },

     updateArtikel:(req, res) => {
        Artikel.updateOne({ _id : req.params.id },{ title : req.body.title})
        .then((result) => {
            res.status(201).json({
                result
            })
        })
        .catch((err) => {
            res.status(500)
        });
     },

     deleteArtikel:(req, res) => {
         Artikel.deleteOne({_id : req.params.id})
         .then((result) => {
             res.status(201).json({
                 result
             })
         })
         .catch((err) => {
             res.status(500)
         });

     }
};
