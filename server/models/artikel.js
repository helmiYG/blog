const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var artikelSchema = new Schema({
   title : {type : String, required : true},
   category : {type : String, required : true},
   userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

var Artikel = mongoose.model('Artikel', artikelSchema);

module.exports = Artikel