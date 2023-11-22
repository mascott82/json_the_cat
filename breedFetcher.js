const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  let targetUrl = 'https://api.thecatapi.com/v1/breeds/search';
  if (breedName) {
    targetUrl = targetUrl + "?q=" + breedName;
  }
  request(targetUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
  
    if (response.statusCode !== 200) {
      callback('Error occured  when trying to access url.', null);
    }
    
    if (body === "[]") {
      callback('Breed not found.', null);
    }
  
    const data = JSON.parse(body);
    callback(null, data[0].description);
  });
};

module.exports = { fetchBreedDescription };