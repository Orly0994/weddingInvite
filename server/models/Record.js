const mongoose = require('mongoose')
const { Schema } = mongoose

const Record = new Schema({
   name: String,
   gender: String,
   drinks: Array,
   comment: String,
   presence: Boolean,
   uuid: String,
   hasAnswered: Boolean,
   timeAnswered: String,
})

module.exports = mongoose.model('Record', Record)