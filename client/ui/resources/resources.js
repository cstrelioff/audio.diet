/*
 * client/ui/resources/resources.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

//
// resourceMinimal
//
Template.resourceMinimal.events({
  'click .js-toggle-bookmark': function(date) {
    var doc = {'user_id': Meteor.userId(),
               'user_name': Meteor.user().username,
               'resource_id': this._id,
               'resource_name': this.name,
               'createdOn': new Date()};

    Meteor.call('toggle_bookmark', doc);
  }
});

//
// resourceVerbose
//
Template.resourceVerbose.events({
  'click .js-toggle-bookmark': function(date) {
    var doc = {'user_id': Meteor.userId(),
               'user_name': Meteor.user().username,
               'resource_id': this._id,
               'resource_name': this.name,
               'createdOn': new Date()};

    Meteor.call('toggle_bookmark', doc);
  }
});

Template.resourceVerbose.helpers({
  relative_date: function(date) {
    return moment(date).fromNow();
  }
});

