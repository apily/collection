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

Collection.prototype = Object.create(Emitter.prototype);
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
    model = new this.model(model);
  }
  model.collection = this;
  this.models.push(model);
  this.emit('add', model);
  return this;
};

/*
 * add_all
 * Add all the `models` to this collection,
 * emit 'add_all' event.
 *
 * @param {Array} models models to add
 * @return {List} this for chaining
 * @api public
 */

Collection.prototype.add_all = function (models) {
  models.forEach(function (model) {
    this.add(model)
  }, this);
  this.emit('add_all', models);
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
    model.collection = null;
    models.splice(index, 1);
    this.emit('remove', model);
  }

  return this;
};

/*
 * remove_all
 * Remove all the `models` from this collection,
 * emit 'remove_all' event.
 *
 * @param {Array} [models|undefined] models to remove 
 * @return {List} this for chaining
 * @api public
 */

Collection.prototype.remove_all = function (models) {
  models = models || this.models.slice();
  models.forEach(function (model) {
    this.remove(model)
  }, this);
  this.emit('remove_all', models);
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

Collection.prototype.find = function(fn){
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

/*
 * find_last
 * Return the last value when `fn(val, i)` is truthy,
 * otherwise return `undefined`.
 *
 *    users.findLast(function(user){
 *      return user.role == 'admin'
 *    })
 *
 * @param {Function} fn
 * @return {Mixed}
 * @api public
 */

Collection.prototype.find_last = function(fn){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = len - 1; i >= 0; i -= 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      return item;
    }
  }

  return;
};

/*
 * every
 * Assert that all invocations of `fn(val, i)` are truthy.
 *
 * For example ensuring that all pets are ferrets:
 *
 *    pets.all(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 *    users.all('admin')
 *
 * @param {Function|String} fn
 * @return {Boolean}
 * @api public
 */

Collection.prototype.all =
Collection.prototype.every = function(fn){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (!test) {
      return false;
    }
  }

  return true;
};

/*
 * Assert that none of the invocations of `fn(val, i)` are truthy.
 *
 * For example ensuring that no pets are admins:
 *
 *    pets.none(function(p){ return p.admin })
 *    pets.none('admin')
 *
 * @param {Function|String} fn
 * @return {Boolean}
 * @api public
 */

Collection.prototype.none = function(fn){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      return false;
    }
  }

  return true;
};

/*
 * any
 * Assert that at least one invocation of `fn(val, i)` is truthy.
 *
 * For example checking to see if any pets are ferrets:
 *
 *    pets.any(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api public
 */

Collection.prototype.any = function(fn){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      return true;
    }
  }

  return false;
};

/*
 * count
 * Count the number of times `fn(val, i)` returns true.
 *
 *    var n = pets.count(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 * @param {Function} fn
 * @return {Number}
 * @api public
 */

Collection.prototype.count = function(fn){
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;
  var n = 0;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = fn(item, i);
    if (test) {
      n += 1;
    }
  }

  return n;
};

/*
 * indexOf
 * Determine the index of `obj` or return `-1`.
 *
 * @param {Mixed} obj
 * @return {Number}
 * @api public
 */

Collection.prototype.indexOf = function(obj){
  return this.models.indexOf(obj)
};


/*
 * has
 * Check if this list contains `obj`.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api public
 */

Collection.prototype.has =
Collection.prototype.contains = function(obj) {
  var items = this.models;
  var len = items.length;
  var i;
  var item;
  var test;

  for (i = 0; i < len; i += 1) {
    item = items[i];
    test = item === obj;
    if (test) {
      return true;
    }
  }

  return false;
};

/*
 * pluck
 * Extract a list of property values.
 *
 * @param {String} sproperty
 * @return {Array}
 * @api public
 */

Collection.prototype.pluck = function(property){
  var items = this.models;
  var plucked = [];

  items.forEach(function (item) {
    plucked.push(item.get(property));
  });

  return plucked;
};
