# collection

Collection component

## Installation

    $ component install apily/collection

## API

### Collection(Array:models, [Object:options])

Create a collection.

```js
var users = new Collection();
```

### Collection#add(Object|Model:model, [Object:options])

Add `model` to this collection,  
emit `add` event.

### Collection#add_all(Array:models, [Object:options])

Add all the `models` to this collection,  
emit `add_all` event.

### Collection#remove(Model:model)

Remove `model` from the collection,  
if the model exists, emit 'remove' event.

### Collection#remove_all(Array:models)

Remove all the `models` from this collection,  
emit `remove_all` event.

### Collection#at(Number:i)

Get the `i`-th model.

### Collection#each(Function:fn)

Iterate each value and invoke `fn(val, i)`.

```js
users.each(function (user, i) {
  console.log(user, i);
});
```

### Collection#map(Function:fn)

Map each return value from `fn(val, i)`.

```js
var names = users.map(function (user) {
  return user.name.first;
});
```

### Collection#select(Function:fn) alias: where

Select all values that return a truthy value of `fn(val, i)`.

```js
var adults = users.select(function (user) {
  return user.age > 18;
});
```

### Collection#unique()

Select all unique values.

### Collection#reject(Function:fn)

Reject all values that return a truthy value of `fn(val, i)`.

```js
var teens = users.reject(function (user) {
  return user.age <= 18;
});
```

### Collection#find(Function:fn)

Return the first value when `fn(val, i)` is truthy,  
otherwise return `undefined`.

```js
var admin = users.find(function (user) {
  return user.role == 'admin';
});
```

### Collection#find_last(Function:fn)

Return the last value when `fn(val, i)` is truthy,  
otherwise return `undefined`.

```js
var admin = users.findLast(function (user) {
  return user.role == 'admin';
});
```

### Collection#every(Function:fn) alias: all

Assert that all invocations of `fn(val, i)` are truthy.

```js
var test = pets.all(function (pet) {
  return pet.species == 'ferret'
});
```

### Collection#none(Function:fn)

Assert that none of the invocations of `fn(val, i)` are truthy.

```js
var test = pets.none(function (pet) { 
  return pet.admin;
});
```

### Collection#any(Function:fn)

Assert that at least one invocation of `fn(val, i)` is truthy.

```js
var test = pets.any(function(pet){
  return pet.species == 'ferret';
});
```

### Collection#count(Function:fn)

Count the number of times `fn(val, i)` returns `true`.

### Collection#indexOf(Model:model) alias: index

Get the index of `model`.

### Collection#has(Model:model) alias: contains

Check if this collection contains `model`.

### Collection#pluck(String:property)

Extract a list of property values.


## License

(The MIT License)

Copyright (c) 2013 Enrico Marino and Federico Spini

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
