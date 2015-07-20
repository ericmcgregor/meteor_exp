Products = new Mongo.Collection('products');

Products.allow({
  insert: function(userId, product) {
    return true;
  },
  update: function(userId, product, fields, modifier) {
    return true;
  },
  remove: function(userId, product) {
    return true;
  }
});

// Products.attachSchema(new SimpleSchema({
//   name: {
//     type: String,
//     label: 'name'
//   },
//   description: {
//     type: String,
//     label: 'description'
//   },
//   name_sort: {
//     type: String,
//     optional: true,
//     autoValue: function() {
//       var name = this.field('name');
//       if(name.isSet) {
//         return name.value.toLowerCase();
//       }
//       else {
//         return this.unset();
//       }
//     }
//   }
// }));
