const request = require('request');

let targetUrl = 'https://api.thecatapi.com/v1/breeds/search';
if (process.argv.length === 3) {
  targetUrl = targetUrl + "?q=" + process.argv[2];
}

request(targetUrl, (error, response, body) => {
  if (error) {
    console.error(`Can not access the given url: ${targetUrl}.`, error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Error occured  when trying to access ${targetUrl}.`, response);
  }
  
  if (body === "[]") {
    console.error(`Breed not found. ${process.argv[2]}`);
    process.exit(1);
  }

  const data = JSON.parse(body);
  console.log('--- Type of Body ---\n', typeof(data), '\n--- ---');
  console.log(data);
  console.log('--- first entry in the data array ---\n', data[0].description, '--- ---');
});