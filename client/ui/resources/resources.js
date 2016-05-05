/*
 * client/ui/resources/resources.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

Template.resourceVerbose.helpers({
  relative_date: function(date) {
    console.log('date: ', date);
    return moment(date).fromNow();
  }
});
