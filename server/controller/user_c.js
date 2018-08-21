const User = require('../models/user');

module.exports = {
    insertUser:(req, res)=>{
        const {name, email, password} = req.body
        User.create({
            name: name,
            email : email,
            password: password
        })
        .then((result) => {
            res.status(201).json({
                result,
                msg: 'register succes'
            })
        })
        .catch((err) => {
            res.status(400).json({
                msg :'email duplicated / value is null',
                err
            })
        });
    },

    login: (req, res) =>{
        const {email, password} = req.body
        User.findOne({email : email})
        .then((userLogin) => {
            if(userLogin){
                if(userLogin.password === password){
                    res.status(201).json({
                        userLogin
                    })
                }else{
                    res.status(400).json({
                        msg: 'password wrong',
                        userLogin
                    })
                }
            }else{
                res.status(400).json({
                    msg: 'email wrong / you not registered yet',
                    err
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                msg: 'email wrong / you not registered yet',
                err
            })
        });
    },

    updateUser: (req, res) =>{
        let id = req.params.id
        let name = req.body.name
        User.updateOne({ _id : id}, {name : name})
        .then((result) => {
            res.status(201).json({
                result
            })
        })
        .catch((err) => {
            res.status(500)
        });
    },

    deleteUser: (req, res) =>{
        User.deleteOne({_id : req.params.id})
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
