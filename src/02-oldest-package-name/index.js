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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const axios = require('axios').default;

const oldestPackageName = async () => {
  let oldestName = "";
  await axios
    .post(`http://ambush-api.inyourarea.co.uk/ambush/intercept`, {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(response => {
      const data = response.data.content;
      data.forEach(o => {
        const result = data.sort((a, b) =>
          a.package.date > b.package.date ? 1 : -1
        );
        oldestName = result[0].package.name;
      });
    });
  return oldestName;
};

module.exports = oldestPackageName;
