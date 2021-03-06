'use strict';

const Card = require('./Card');


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ListSchema = new Schema({
  name: { type: String },
  description : { type: String },
  createdBy : { type: String },
  updatedBy : { type: String },
  createdDate :  Date,
  updatedDate : Date,
  cards : [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  position : Number,
  boardId : { type: String }

});


ListSchema.statics = {


    get: function(query, callback) {
        this.findOne(query, callback);
    },
    getAll: function(query, callback) {
        this.find(query, callback);
    },
    updateById: function(id, updateData, callback) {
        updateData.updatedDate = new Date();
        this.update(id, {$set: updateData}, callback);
    },
    remove: function(removeData, callback) {
         this.remove(removeData, callback);
    },
    create: function(data, callback) {
        var list = new this(data);
        list.save(callback);
    }
}

var list = mongoose.model('list', ListSchema);

/** export schema */
module.exports = {
    List: list
};
