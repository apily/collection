
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
 * Add an item to the list,  
 * emit 'add' event.
 * 
 * @param {Mixed} item item to add
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
