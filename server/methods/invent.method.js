'use strict';

Meteor.methods({
  invent: function() {
    //return a value

    return Products.insert({name:'test', description:'HELLO!'});
    
  }
});
