var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.Promise = Promise;
  mongoose.connect(require('./connection-string'), {
    useMongoClient: true
  });

}

var newSchema = new Schema({
  
  'title': { type: String, unique: true },
  'url': { type: String },
  'publishtime': { type: String },
  'image': { type: String },
  'excerpt': { type: String },
  'comments':{type: Array},
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now },

});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('Article', newSchema);