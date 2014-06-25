'use strict';

var carver = require('carver');

// a dummy webpage object simulating an object
// retrieved from a database
var webpage = require(__dirname+'/fixtures/webpage');

carver()

  // includes the defaul file writer
  // you can attach all kinds of writers. but currently carver only includes
  // a basic filesystem writer
  .includeFileWriter()

  // we use jade in this example
  // but you are free to use any engine, that comes with
  // a 'render' command
  .registerEngine('jade', require('jade'))

  // the cwd (current working directory) is the basis for
  // parsing for template files. See the layouts directory for it's
  // content structure
  .set('cwd', __dirname+'/layouts')

  // we want to demonstrate the use of a simple webpage object - however
  // you create it you can configure it's basic properties with the
  // options.contentKey, options.manyKey, options.publishStatusKey, and many
  // more. See the api documentation for details
  .set('doc', webpage)

  // the markdownCompiler plugin parses your doc for
  // a 'content' or options.contentKey property and
  // provides this as markdownContent inside your template file
  // see layouts/index.jade for usage
  .registerHook('before.render', require('carver/plugins').markdownCompiler)

  // write finally writes out the file to the destinations configured in
  // layouts/config/env.js
  .write()
  .then( function( compiler ){
    console.log('Your webpage has been written to', compiler.finalFilename);
  });

