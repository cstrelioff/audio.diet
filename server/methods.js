/*
 * server/methods.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

Meteor.methods({
  toggle_bookmark: function(doc) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("Not authorized!");
    }

    var doc_basics = {'user_id': doc.user_id, 'resource_id': doc.resource_id};
    var bookmark_id = Bookmarks.findOne(doc_basics);

    if (!bookmark_id) {
      Bookmarks.insert(doc);
    }
    else {
      Bookmarks.remove(bookmark_id);
    }
  },
});
