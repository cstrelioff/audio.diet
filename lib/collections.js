/*
 * lib/collections.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
Tags = new Mongo.Collection('tags');
Comments = new Mongo.Collection('comments');

//
// Bookmarks
//
Bookmarks = new Mongo.Collection('bookmarks');

Bookmarks.attachSchema(new SimpleSchema({
  resource_id: {
    type: String,
    label: "resource_id",
    max: 200
  },
  resource_name: {
    type: String,
    label: "resource_name",
    max: 200
  },
  user_id: {
    type: String,
    label: "user_id",
    max: 200
  },
  user_name: {
    type: String,
    label: "user_name",
    max: 200
  },
  createdOn: {
    type: Date,
    label: "createdOn"
  },
}));

//
// Resources
//
Resources = new Mongo.Collection('resources');

Resources.allow({
  insert: function(userId, doc) {
    return doc && doc.createdBy.id === userId;
  }
});

Resources.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  slug: {
    type: String,
    label: "Slug",
    max: 200
  },
  url: {
    type: String,
    label: "URL",
    regEx: SimpleSchema.RegEx.Url
  },
  description: {
    type: String,
    label: "Description",
    optional: true,
    max: 2000
  },
  tags: {
    type: Array,
    label: "Tags",
    optional: true,
    minCount: 0
  },
  'tags.$': {
    type: Object
  },
  'tags.$.name': {
    type: String,
  },
  'tags.$.slug': {
    type: String,
  },
  createdOn: {
    type: Date,
    label: "Date Created"
  },
  createdBy: {
    type: Object,
    label: 'Created By'
  },
  'createdBy.username': {
    type: String
  },
  'createdBy.id': {
    type: String
  }
}));
