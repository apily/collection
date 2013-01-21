
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

/*
 * select
 * Select all values that return a truthy value of `fn(val, i)`.
 *
 *    users.select(function(user){
 *      return user.age > 20
 *    })
 *
 * @param {Function} fn iterator
 * @return {Collection} the collection of selected items
 * @api public
 */

Collection.prototype.select = 
Collection.prototype.where = function(fn){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (var i = 0; i < len; ++i) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      result.push(item);
    }
  }

  return new Collection(result);
};

/*
 * unique
 * Select all unique values.
 *
 *    nums.unique()
 *
 * @return {Collection} the collection of unique values
 * @api public
 */

Collection.prototype.unique = function(){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = result.indexOf(item) === -1;
    if (test) {
      result.push(item);
    }
  }

  return new Collection(result);
};

/*
 * reject
 * Reject all values that return a truthy value of `fn(val, i)`.
 *
 *    users.reject(function(user){
 *      return user.age < 20
 *    })
 *
 * @param {Function} fn iterator
 * @return {Collection} the filtered collection
 * @api public
 */

Collection.prototype.reject = function(fn){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (!test) {
      result.push(item);
    }
  }

  return new Collection(result);
};

/*
 * find
 * Return the first value when `fn(val, i)` is truthy,
 * otherwise return `undefined`.
 *
 *    users.find(function(user){
 *      return user.role == 'admin'
 *    })
 *
 * @param {Function} fn iterator
 * @return {Mixed}
 * @api public
 */

List.prototype.find = function(fn){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;
  var result = [];

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      return item;
    }
  }

  return;
};
