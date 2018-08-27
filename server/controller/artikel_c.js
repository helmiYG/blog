const Artikel = require('../models/artikel');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    getArtikel: (req, res) => {
        Artikel.find().populate('userId')
            .then((result) => {
                res.status(200).json({
                    result
                })
            })
            .catch((err) => {
                res.status(500)
            });
    },
    insertArtikel: (req, res) => {
        let decode = jwt.verify(req.body.token, process.env.secretKey)
        Artikel.create({
            title: req.body.title,
            category: req.body.category,
            userId: decode.id,
            content: req.body.content,
            image: req.body.image
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

    updateArtikel: (req, res) => {
        Artikel.updateOne({ _id: req.params.id }, {
            title: req.body.title,
            category: req.body.category,
            content: req.body.content
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

    deleteArtikel: (req, res) => {
        Artikel.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(201).json({
                    result
                })
            })
            .catch((err) => {
                res.status(500)
            });

    },

    getUserArtikel: (req, res) => {
        let decode = jwt.verify(req.headers.token, process.env.secretKey)
        Artikel.find({ userId: decode.id }).populate('userId')
            .then((result) => {
                res.status(200).json({
                    result
                })
            })
            .catch((err) => {
                res.status(500)
            });
    },
    getOneArticle: (req, res) => {
        let idArticle = req.params.id
        Artikel.findOne({ _id: idArticle }).populate('userId')
            .then((article) => {
                res.status(200).json(
                    article
                )
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },
    addComments: (req, res) => {
        let idArticle = req.params.id
        let token = req.headers.token
        let decode = jwt.verify(token, process.env.secretKey)
        let obj = {
            commenterId : decode.id,
            commenterName : decode.name,
            comment : req.body.content
        }
        Artikel.updateOne({_id : idArticle}, {$push: {comments : obj}})
        .then((result) => {
            res.status(201).json(result)
            
        }).catch((err) => {
            res.status(400).json(err)
        });
    },
    deleteComment: (req, res) => {
        let idArticle = req.params.id
        let idComment = req.body.idComment
        Artikel.updateOne({_id : idArticle}, {$pull: {comments : {_id : idComment}}})
        .then((result) => {
            res.status(201).json({
                result
            })
        }).catch((err) => {
            res.status(400).json(err)
        });
    }
};
