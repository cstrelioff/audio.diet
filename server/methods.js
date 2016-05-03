/*
 * server/methods.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

Meteor.methods({
  add_data: function(description) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("Not authorized!");
    }

    FakeData.insert({description: description,
                     createdBy: Meteor.user().username,
                     createdAt: new Date()});
  },
});
