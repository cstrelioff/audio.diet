/*
 * lib/routes.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'resourceList',
  yieldRegions: {
    'navbarRoot': {to: 'header'},
    'resourceList': {to: 'main'}
  },  
  subscriptions: function() {
    this.subscribe("resources").wait();
    this.subscribe("bookmarks").wait();
    this.subscribe("users").wait();
  },
  data: function() {
    var res = Resources.find({}),
        res_mod = [];

    res.forEach(function(data, index) {
      res_mod.push(data);
      res_mod[index].bookmark_count = Bookmarks.find({'resource_id': data._id}).count();
      if (!Meteor.user()) {
        res_mod[index].bookmarked = false;
      }
      else {
        res_mod[index].bookmarked = Bookmarks.findOne({'resource_id': data._id,
                                                       'user_id': Meteor.user()._id});
      }
    });

    return {resources: res_mod,
            verbose: false}
  },
  actions: function() {
    if (this.ready()) {
      this.render();
    } else {
      this.render('loading');
    }
  }
});

Router.route('/add-resource', {
  name: 'resourceAdd',
  yieldRegions: {
    'navbarAddResource': {to: 'header'},
    'resourceAdd': {to: 'main'}
  },  
  subscriptions: function() {
    this.subscribe("resources").wait();
  },
  actions: function() {
    if (this.ready()) {
      this.render();
    } else {
      this.render('loading');
    }
  }
});

Router.route('/user/:username', {
  name: 'user',
  yieldRegions: {
    'navbarUser': {to: 'header'},
    'user': {to: 'main'}
  },
  subscriptions: function() {
    this.subscribe('user', this.params.username).wait();
    this.subscribe('bookmark.user', this.params.username).wait();
    this.subscribe('resource.user', this.params.username).wait();
  },
  data: function() {
    var focus_user = Meteor.users.findOne({username: this.params.username}),
      resources_added = Resources.find();

    if (!focus_user) {
      return null;
    }
    else {
      return {user: focus_user,
              resources: resources_added};
    }
  },
  onBeforeAction: function() {
    if(!this.data()) {
      this.render('notFoundUser');
    }
    else {
      this.next();
    }
  }
});

Router.route('/resource/:_id', {
  name: 'resource',
  yieldRegions: {
    'navbarResource': {to: 'header'},
    'resourceItem': {to: 'main'}
  },
  subscriptions: function() {
    this.subscribe("resource.detail", this.params._id).wait();
    this.subscribe("users").wait();
    this.subscribe("bookmarks").wait();
  },
  data: function() {
    var focus_resource = Resources.findOne();
    if (!focus_resource) {
      return null;
    }

    focus_resource.bookmark_count = Bookmarks.find({'resource_id': this.params._id}).count();

    if (!Meteor.user()) {
      focus_resource.bookmarked = false;
    }
    else {
      focus_resource.bookmarked = Bookmarks.findOne({'resource_id': this.params._id,
                                                     'user_id': Meteor.user()._id});
    }

    return {resource: focus_resource};
  },
  onBeforeAction: function() {
    if (!this.data()) {
      this.render('notFoundResource');
    }
    else {
      this.next();
    }
  }
});

Router.route('/tag/:slug', {
  name: 'tag',
  yieldRegions: {
    'navbarTag': {to: 'header'},
    'resourceList': {to: 'main'}
  },
  subscriptions: function() {
    this.subscribe("resources.tag", this.params.slug).wait();
  },
  data: function() {
    var focus_tag_resources = Resources.find({'tags.slug': this.params.slug});

    if (focus_tag_resources.count() == 0){
      this.render('notFoundTag');
    }
    else {
      return {resources: focus_tag_resources,
              slug: this.params.slug,
              verbose: false}
    }
  },
  onBeforeAction: function() {
    if(!this.data()) {
      this.render('notFoundTag');
    }
    else {
      this.next();
    }
  }
});


var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'resourceAdd'});
