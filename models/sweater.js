var mongoose = require('mongoose');

var SweaterSchema = new mongoose.Schema({
  title: String,
  material: String,
  pompoms: Number,
  color: String,
  img: String,
  userId: String
});

module.exports = mongoose.model('Sweater', SweaterSchema);
