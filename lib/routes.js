/*
 * lib/routes.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'resourceList',
  yieldRegions: {
    'navbar-root': {to: 'header'},
    'resourceList': {to: 'main'}
  },  
  subscriptions: function() {
    this.subscribe("resources").wait();
  },
  data: function() {
    return {resources: Resources.find({}),
            verbose: true}
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
    'navbar-user': {to: 'header'},
    'user': {to: 'main'}
  },
  subscriptions: function() {
    this.subscribe('user', this.params.username);
  },
  data: function() {
    return Meteor.users.findOne({username: this.params.username});
  },
  actions: function() {
    if (this.ready()) {
      this.render();
    } else {
      this.render('loading');
    }
  }
});

Router.route('/resource/:_id', {
  name: 'resource',
  yieldRegions: {
    'navbar-resource': {to: 'header'},
    'resourceItem': {to: 'main'}
  },
  subscriptions: function() {
    this.subscribe("resource.detail", this.params._id).wait();
  },
  data: function() {
    return {resource: Resources.findOne()}
  },
  actions: function() {
    if (this.ready()) {
      this.render();
    } else {
      this.render('loading');
    }
  }
});

Router.route('/tag/:slug', {
  name: 'tag',
  yieldRegions: {
    'navbar-tag': {to: 'header'},
    'resourceList': {to: 'main'}
  },
  subscriptions: function() {
    this.subscribe("resources.tag", this.params.slug).wait();
  },
  data: function() {
    return {resources: Resources.find({'tags.slug': this.params.slug}),
            slug: this.params.slug,
            verbose: true}
  },
  actions: function() {
    if (this.ready()) {
      this.render();
    } else {
      this.render('loading');
    }
  }
});
