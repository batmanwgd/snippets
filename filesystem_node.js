#!/usr/bin/env node

const fs = require('fs');
const chokidar = require('chokidar');

chokidar
  .watch('.', {
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../
  })
  .on('all', (event, path) => {
    console.log(event, path);
    let logfile = '~/Downloads/changes.log';
    let data = Math.floor(Date.now() / 1000) + ' | ' + event + ' | ' + path;
    fs.writeFile(logfile, data, err => {
		  if (err) console.log(err);
		  console.log("Successfully Written to File.");
		});
  })
  .on('ready', () => console.log('Initial scan complete. Ready for changes.'));
