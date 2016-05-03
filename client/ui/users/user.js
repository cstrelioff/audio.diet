/*
 * client/ui/users.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
Template.user.helpers({
  is_loggedin_user: function() {
    // avoid exception if Meteor.user() returns undefined
    if (Meteor.user()) {
      return (Meteor.user().username === this.username);
    } 
    else {
      return false;
    }
  }
});
