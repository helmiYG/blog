let chai = require('chai');
let expect = chai.expect
let chaiHttp = require('chai-http');
chai.use(chaiHttp)
const Artikel = require('../models/artikel');
const mongoose = require('mongoose');

mongoose.connect('mongodb://helmi:helmi12345@ds227322.mlab.com:27322/dbblog_2', { useNewUrlParser: true })
// Artikel.collection.drop()

describe('Artikel', function () {
    it('POST /artikel should return object new artikel', function(done){
        chai.request('http://localhost:3000')
        .post('/artikel')
        .send({
            title : 'cuma kamu',
            category : 'roman',
            userId : '5b7bb9a630685e5d3ee78cd5'
        })
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body.result).to.have.property('title')
            expect(res.body.result).to.have.property('category')
            expect(res.body.result).to.have.property('userId')
            done()
        })
    })

    it('GET /artikel should return all data artikel', function (done) {
        chai.request('http://localhost:3000')
            .get('/artikel')
            .end(function (err, res)
             {
                expect(res).to.have.status(200)
                expect(res.body.result).to.be.a('array')
                done()
            })
    })

    it('PUT /artikel should return object', function(done){
        chai.request('http://localhost:3000')
        .put('/artikel/5b7ba63c922f5c37fc4b80a3')
        .send({
            title : 'cuma rindu',
            category : 'roman'
        })
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body.result).to.have.property('n')
            expect(res.body.result.n).to.equal(1)
            expect(res.body.result).to.have.property('nModified')     
            done()
        })
    })

    it('DELETE /artikel should return object', function(done){
        chai.request('http://localhost:3000')
        .delete('/artikel/5b7ba63c922f5c37fc4b80a3')
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body.result).to.have.property('n')
            expect(res.body.result.n).to.equal(1)
            done()
        })
    })
})


// register succes
describe('User', function () {

    // register succes
    it('POST /register shoul return info user registered', function(done){
        chai.request('http://localhost:3000')
        .post('/regsiter')
        .send({
            name: 'wahyu',
            email : 'wahyu@mail.com',
            password: '12345'
        })
        .end(function(err, res){
            expect(res.body).to.be.a('object')
            expect(res.body.result).to.have.property('name')
            expect(res.body.result).to.have.property('email')
            expect(res.body.result).to.have.property('password')
            expect(res.body.msg).to.equal('register succes')
            expect(res).to.have.status(201)
            done()
        })
    })

    // regsiter failed, value is null 
    it('POST /register regsiter failed, value is null', function (done) {
        chai.request('http://localhost:3000')
            .post('/regsiter')
            .send({
                name: '',
                email: '',
                password: ''
            })
            .end(function (err, res) {
                expect(res.body).to.be.a('object')
                expect(res).to.have.status(400)
                expect(res.body.msg).to.equal('email duplicated / value is null')
                done()
            })
    })

    // register failed, email duplicated
    it('POST /register register failed, email duplicated', function(done){
        chai.request('http://localhost:3000')
        .post('/regsiter')
        .send({
            name: 'helmi',
            email : 'helmi@mail.com',
            password: '12345'
        })
        .end(function(err, res){
            console.log(res);

            expect(res.body).to.be.a('object')
            expect(res.body.msg).to.equal('email duplicated / value is null')
            expect(res).to.have.status(400)
            done()
        })
    })

    // login succes
    it('POST /login should return info user login', function(done){
        chai.request('http://localhost:3000')
        .post('/login')
        .send({
            email : 'andre@mail.com',
            password: '12345'
        })
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body.userLogin).to.have.property('name')
            expect(res.body.userLogin).to.have.property('email')
            expect(res.body.userLogin).to.have.property('password')
            done()
        })
    })


    // login failed, password wrong

    it('POST /login login failed, password wrong', function (done) {
        chai.request('http://localhost:3000')
            .post('/login')
            .send({
                email: 'andre@mail.com',
                password: '12346'
            })
            .end(function (err, res) {
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body.msg).to.equal('password wrong')
                done()
            })
    })

    //login failed, email wrong

    it('POST /login login failed, email wrong', function (done) {
        chai.request('http://localhost:3000')
            .post('/login')
            .send({
                email: 'jajaja@mail.com',
                password: '12346'
            })
            .end(function (err, res) {
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body.msg).to.equal('email wrong / you not registered yet')
                done()
            })
    })


    //update user
    it('PUT /users should return info updated ', function(done){
        chai.request('http://localhost:3000')
        .put('/users/5b7bb9a630685e5d3ee78cd5')
        .send({
            name : 'bung'
        })
        .end(function(err, res){
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body.result).to.have.property('n')
            expect(res.body.result.n).to.equal(1)
            expect(res.body.result).to.have.property('nModified')
            done()
        })
    })

    // delete user
    it('DELETE /users should return info deleted', function(done){
        chai.request('http://localhost:3000')
        .delete('/users/5b7bb9a630685e5d3ee78cd5')
        .end(function(err, res){
            console.log(res);
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body.result).to.have.property('n')
            expect(res.body.result.n).to.equal(1)
            done()
        })
    })

})