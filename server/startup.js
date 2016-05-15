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
    resource_array = [
                      {name: 'pure data',
                       slug: 'pure-data',
                       url: 'http://puredata.info/',
                       description: 'Pure Data (aka Pd) is an open source visual programming language. ' + 
                         'Pd enables musicians, visual artists, performers, researchers, and developers ' + 
                         'to create software graphically, without writing lines of code. Pd is used to ' + 
                         'process and generate sound, video, 2D/3D graphics, and interface sensors, input devices, and MIDI.',
                       tags: [{name: 'visual programming', slug: 'visual-programming'},
                              {name: 'open source', slug: 'open-source'}, 
                              {name: 'software', slug: 'software'}],
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
                              {name: 'microcontroller', slug: 'microcontroller'},
                              {name: 'hardware', slug: 'hardware'},
                              {name: 'electronics', slug: 'electronics'}],
                       createdOn: new Date()
                      },
                      {name: 'SuperCollider',
                       slug: 'SuperCollider',
                       url: 'https://supercollider.github.io/',
                       description: 'SuperCollider is a programming language for real time ' + 
                         'audio synthesis and algorithmic composition. The language interpreter ' +
                         'runs in a cross platform IDE (OS X/Linux/Windows) and communicates via ' +
                         'Open Sound Control with one or more synthesis servers. The SuperCollider ' +
                         'synthesis server runs in a separate process or even on a separate machine ' +
                         'so it is ideal for realtime networked music. SuperCollider was developed by ' +
                         'James McCartney and originally released in 1996. He released it under the ' +
                         'terms of the GNU General Public License in 2002 when he joined the Apple Core ' +
                         'Audio team. It is now maintained and developed by an active and enthusiastic ' +
                         'community. It is used by musicians, scientists, and artists working with sound.',
                       tags: [{name: 'open source', slug: 'open-source'},
                              {name: 'software', slug: 'software'}],
                       createdOn: new Date()
                      },
                      {name: 'cSound',
                       slug: 'cSound',
                       url: 'https://csound.github.io/',
                       description: 'Csound is a sound and music computing system ' +
                         'which was originally developed by Barry Vercoe in 1985 at ' +
                         'MIT Media Lab. Since the 90s, it has been developed by a group ' +
                         'of core developers. A wider community of volunteers contribute ' +
                         'examples, documentation, articles, and takes part in the Csound ' +
                         'development with bug reports, feature requests and discussions ' +
                         'with the core development team. Although Csound has a strong tradition ' +
                         'as a tool for composing electro-acoustic pieces, it is used by composers ' +
                         'and musicians for any kind of music that can be made with the help ' +
                         'of the computer. Csound has tradtionally being used in a non-interactive ' +
                         'score driven context, but nowadays it is mostly used in in a real-time ' +
                         'context. Csound can run on a host of different platforms incuding all major ' +
                         'operating systems as well as Android and iOS. Csound can also be called ' +
                         'through other programming languages such as Python, Lua, C/C++, Java, etc.',
                       tags: [{name: 'open source', slug: 'open-source'},
                              {name: 'software', slug: 'software'}],
                       createdOn: new Date()
                      },
                      {name: 'Ableton Live',
                       slug: 'Abelton-Live',
                       url: 'https://www.ableton.com/en/live/',
                       description: 'Live is software for creating musical ideas, ' +
                         'turning them into finished songs, and even taking them onto ' +
                         'the stage. With two views - the classic Arrangement View, where ' +
                         'musical ideas are laid out along a timeline, and the unique ' +
                         'Session View, where you can improvise and quickly experiment ' +
                         'with musical ideas - Live is a fast, fun, intuitive way to make music.',
                       tags: [{name: 'commercial', slug: 'commercial'},
                              {name: 'software', slug: 'software'},
                              {name: 'daw', slug: 'daw'}],
                       createdOn: new Date()
                      },
                      {name: 'Bleep Labs Rad-Fi System',
                       slug: 'Bleep-Labs-Rad-Fi-System',
                       url: 'http://bleeplabs.com/store/the-rad-fi-system/',
                       description: 'Breadboard based Glitch Delay and Patchable MIDI ' +
                         'Synth kits.',
                       tags: [{name: 'hardware', slug: 'hardware'},
                              {name: 'diy', slug: 'diy'},
                              {name: 'electronics', slug: 'electronics'},
                              {name: 'analog', slug: 'analog'},
                              {name: 'digital', slug: 'digital'}],
                       createdOn: new Date()
                      },

    ]

    resource_array.forEach(function (data, index) {
      // create randomuser for resource
      var rindex = Math.floor(Math.random() * (user_max - user_min + 1)) + user_min;
      var randomuser = user_array[rindex];
      data.createdBy = randomuser;

      console.log('Adding resource: ' + data.name);
      resource_id = Resources.insert(data);

      // randomly add bookmarks
      user_array.forEach(function(user_data, user_index) {
        if (Math.random() < 0.25) {
          // 25% probability of bookmark
          Bookmarks.insert({resource_id: resource_id,
                            resource_name: data.name,
                            user_id: user_data.id,
                            user_name: user_data.username,
                            createdOn: new Date()
                           })
        }
      });

    });

  }
});
