/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}


 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

 const axios = require('axios').default;

 const countMajorVersionsAbove10 = async () => {
   const versionsOverTen = [];
   await axios
     .post(`http://ambush-api.inyourarea.co.uk/ambush/intercept`, {
       url: 'https://api.npms.io/v2/search/suggestions?q=react',
       method: 'GET',
       return_payload: true,
     })
     .then(response => {
       data = response.data.content;
       data.forEach(o => {
         const versionString = o.package.version;
         const majorIndex = versionString.indexOf('.');
         const firstTwoNumbersOfVersion = versionString.substring(0, majorIndex);
         const versionInt = parseInt(firstTwoNumbersOfVersion);
         if (versionInt > 10) {
           versionsOverTen.push(versionInt);
         }
       });
     });
   return versionsOverTen.length;
 };
 
 module.exports = countMajorVersionsAbove10;
 