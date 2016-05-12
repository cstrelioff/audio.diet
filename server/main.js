/*
 * server/main.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
Meteor.publish('users', function() {
  return Meteor.users.find({}, {fields: {
    profile: false,
    services: false
  }});
});

Meteor.publish('user', function(username) {
  return Meteor.users.find({username: username});
});

Meteor.publish('bookmarks', function() {
  return Bookmarks.find({});
});

Meteor.publish('bookmark.detail', function(resource_id) {
  return Bookmarks.find({'resource_id': resource_id});
});

Meteor.publish('resource.detail', function(_id) {
  return Resources.find(_id);
});

Meteor.publish('resources', function() {
  return Resources.find({});
});

Meteor.publish('resources.tag', function(slug) {
  return Resources.find({'tags.slug': slug});
});

Meteor.publish('tags', function() {
  return Tags.find({});
});

Meteor.publish('comments', function() {
  return Comments.find({});
});
