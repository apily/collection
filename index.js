
/*
 * collection
 * Collection component
 *
 * @copyright 2012 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/*
 * Expose `Collection`
 */

module.exports = Collection;

/*
 * Module dependencies
 */

var Emitter = require('emitter');
var Model = require('model');

/*
 * Collection
 * Create a collection.
 *
 * @param {Array} models models
 * @return {Collection} a collection
 */

function Collection(models) {
  if (!(this instanceof Collection)) {
    return new Collection(models);
  }
  Emitter.call(this);
  this.models = models || [];
}

/*
 * Inheritance
 */

Collection.prototype = Emitter.prototype;
Collection.prototype.constructor = Collection;

/*
 * Model constructor
 */

Collection.prototype.model = Model;

/*
 * add
 * Add `model` to this collection,  
 * emit 'add' event.
 * 
 * @param {Mixed} model model to add
 * @return {List} this for chaining
 * @api public
 */

Collection.prototype.add = function (model) {
  if (!(model instanceof Model)) {
    model = new Model(model);
  }
  this.models.push(model);
  this.emit('add', model);
  return this;
};

/*
 * remove
 * Remove `model` from the collection,  
 * if the model exists, emit 'remove' event.
 * 
 * @param {Mixed} item item to add
 * @return {List} this for chaining
 * @api public
 */

Collection.prototype.remove = function (model) {
  var models = this.models;
  var index = models.indexOf(model);
  var present = index !== -1;

  if (present) {
    models.splice(index, 1);
    this.emit('remove', model);
  }

  return this;
};

/*
 * each
 * Iterate each value and invoke `fn(val, i)`.
 *
 *    users.each(function(user, i){
 *
 *    })
 *
 * @param {Function} fn iterator
 * @return {Collection} this for chaining
 * @api public
 */

Collection.prototype.each = function(fn){
  this.models.forEach(fn);
  return this;
};

/*
 * map
 * Map each return value from `fn(val, i)`.
 *
 *    users.map(function(user){
 *      return user.name.first
 *    })
 *
 * @param {Function} fn iterator
 * @return {Collection} the mapped list
 * @api public
 */

Collection.prototype.map = function(fn){
  var models = this.models.map(fn);
  var result = new Collection(models);
  return result;
};
