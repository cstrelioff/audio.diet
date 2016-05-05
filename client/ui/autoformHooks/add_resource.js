/*
 * client/ui/autoformHooks/add_resource.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

var resourceHooks = {
  before: {
    insert: function(doc) {
      // slug
      doc.slug = doc.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();

      // createdOn
      doc.createdOn = new Date();

      // createdBy
      if(Meteor.userId()){
        doc.createdBy = {};
        doc.createdBy.id = Meteor.userId();
        doc.createdBy.username = Meteor.user().username;
      }

      return doc;
    }
  },
  formToDoc: function(doc) {
    var temp;
    if (typeof doc.tags === "string") {
      temp = doc.tags.split(",");
    }

    // store as array of plugs
    temp.forEach(function(data, index) {
      if (data[0] === ' ') {
        data = data.slice(1);
      }
      temp[index] = {name: data,
                     slug: data.replace(/[^a-z0-9]/gi, '-').toLowerCase()};
    });

    doc.tags = temp;
    return doc;
  }
}

AutoForm.addHooks('resourceAdd', resourceHooks);
