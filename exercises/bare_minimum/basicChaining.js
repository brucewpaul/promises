/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');
var pr = require('./promisification');
var cb = Promise.promisifyAll(require('./callbackReview'));
// var cb = require('./callbackReview');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return new Promise( function(resolve, reject) {
    return cb.pluckFirstLineFromFileAsync(readFilePath)
      .then(function(username) {
        return pr.getGitHubProfileAsync(username);
      })
      .then(function(githubProfile) {
        jsonBody = JSON.stringify(githubProfile);
        fs.writeFile(writeFilePath, jsonBody, 'utf8', function(err) {
          // console.log('responsebody in writeFile', responseBody); 
          if (err) { reject(); }
          resolve();
        });
      }).catch(function(err) {
        reject(err);
      });
  });
  // var func1 = new Promise(function(resolve, reject) {
  //   fs.readFile(readFilePath, 'utf8', function(err, data) {
  //     if (err) { reject(err); }
  //     resolve(data);
  //   });
  // });

  // // return new Promise(function(resolve, reject) {
  // return func1
  //   .then(function(stringToWrite) {

  //     var username = stringToWrite.split('\n')[0];

  //     return new Promise(function(resolve, reject) {
  //       request('https://api.github.com/users/' + username, function(err, res, body) {
  //         if (res.statusCode = 200) {
  //           // console.log('body', body);
  //           console.log('body', body);
  //           resolve( body );
  //         } else {
  //           reject(err);
  //         }
  //       });

  //     });

  //   })
  //   .then(function(responseBody) {
  //     console.log('responseBody', responseBody);
  //     return new Promise(function(resolve, reject) {
  //       fs.writeFile(writeFilePath, responseBody, 'utf8', function(err) {
  //         console.log('responsebody in writeFile', responseBody); 
  //         if (err) { reject(); }
  //       });
  //       // console.log('the file says', fs.readFile(writeFilePath)); 
        
  //       // return;
  //     });
  //   })
  //   .catch(function (err) {
  //     reject(err);
  //   });
  // });
  
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
