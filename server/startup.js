/*
 * server/startup.js
 *
 * Copyright (C) 2016 Christopher C. Strelioff <chris.strelioff@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */
Meteor.startup(function () {
  var user_array = [],
    resource_array = [],
    user_min = 1,
    user_max = 15;

  //
  // Users
  //
  if (!Meteor.users.findOne()){
    console.log('\n-- No data in Meteor.users -- creating some!');
    for (var i = user_min; i <= user_max; i++){
      var email = 'user' + i + '@test.com';
      var username = 'user' + i;
      user_array[i] = {username: username};
      console.log('Creating user ' + username + ' with password "test123" and email: ' + email);

      user_array[i].id = Meteor.users.insert({username: username,
        createdAt: new Date(),
        emails :[{address: email, verified: false}],
        services: {password: {'bcrypt': '$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO'}}});
    }
  }

  //
  // Resources`
  //
  if (Resources.find().count() === 0){
    console.log('\n-- No data in Resources -- creating some!');
    resource_array = [{name: 'pure data',
                       slug: 'pure-data',
                       url: 'http://puredata.info/',
                       description: 'Pure Data (aka Pd) is an open source visual programming language. ' + 
                         'Pd enables musicians, visual artists, performers, researchers, and developers ' + 
                         'to create software graphically, without writing lines of code. Pd is used to ' + 
                         'process and generate sound, video, 2D/3D graphics, and interface sensors, input devices, and MIDI.',
                       tags: [{name: 'visual programming', slug: 'visual-programming'},
                              {name: 'midi', slug: 'midi'},
                              {name: 'software synthesis', slug: 'software-synthesis'},
                              {name: 'free', slug: 'free'}, 
                              {name: 'open source', slug: 'open-source'}, 
                              {name: 'software', slug: 'software'},
                              {name: 'hardware', slug: 'hardware'}],
                       createdOn: new Date()},
                      {name: 'axoloti',
                       slug: 'axoloti',
                       url: 'http://www.axoloti.com/',
                       description: 'Axoloti allows sketching digital audio algorithms with ' + 
                         'the musical playability of standalone hardware. The Axoloti Patcher ' + 
                         'offers a “patcher” environment similar to Max/MSP, Pure Data or Reaktor. ' +
                         'The patches run on a standalone powerful microcontroller board : Axoloti Core.',
                       tags: [{name: 'visual programming', slug: 'visual-programming'}, 
                              {name: 'open source', slug: 'open-source'},
                              {name: 'diy', slug: 'diy'},
                              {name: 'microcontroller', slug: 'microcontroller'},
                              {name: 'hardware', slug: 'hardware'},
                              {name: 'software', slug: 'software'},
                              {name: 'electronics', slug: 'electronics'}],
                       createdOn: new Date()
                      }]

    resource_array.forEach(function (data, index) {
      // create randomuser for resource
      var rindex = Math.floor(Math.random() * (user_max - user_min + 1)) + user_min;
      var randomuser = user_array[rindex];
      data.createdBy = randomuser;

      console.log('Adding resource: ' + data.name);
      Resources.insert(data);
    });

  }
});
