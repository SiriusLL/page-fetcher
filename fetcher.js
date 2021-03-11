// Implement a small command line node app called fetcher.js which should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.

//Use the request library to make the http request.

const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const fPath = process.argv[3];

const downLoader = (url, fPath) => {
  
  request(url, (error, response, body) => {
    //console.log(error);
    console.log("*********************" + response);
    if (error) {
      console.log('Failed to download:', error); // Print the error if one occurred
      
    };
    if (!response || response.statusCode !== 200) {
    
      console.log(`URL --> ${url} BROKEN!! \n ${error}`);
      process.exit();
    };

    if (fs.existsSync(fPath)) {                   //fs.exixtsSync(fPath) checks if path to file exisits
      console.log("File exists.");
    } else {
      console.log("File does not exist.");
    };

    
// Use Node's fs module to write the file
  fs.writeFile(fPath, body, (error) => {        // writes a file to the path, uses body to check body.length to return #bytes and gives error if error
    console.log("here it is" + body);
    if (error) {
      console.log('Failed to write!!');
    } else {
      console.log(`Downloaded and saved ${body.length} bytes to ${fPath}.`);  
    }
  });
});
}

// Use the callback based approach we've been learning so far
downLoader(url, fPath);






// Do not use the pipe function

//Do not use synchronous functions (see warning below)