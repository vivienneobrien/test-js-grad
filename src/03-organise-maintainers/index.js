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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

const axios = require('axios').default;

const organiseMaintainers = async () => {
  let maintainerObjectList = []; 
  await axios
    .post(`http://ambush-api.inyourarea.co.uk/ambush/intercept`, {
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      method: 'GET',
      return_payload: true,
    })
    .then(response => {
      const data = response.data.content;
      let maintainersNames = [];
      data.forEach(o => {
        const maintainersData = o.package.maintainers;
        maintainersNames.push(...maintainersData.map(user => user.username))
      });
      nameSet = new Set(maintainersNames); // removes duplicates
      names = [...nameSet]
      names.forEach(username => { 
        let result = [];
        data.forEach(data => {
          if (checkedPackages(username, data.package)) { // is true because we return the package name
            result.push(data.package.name);
          }
        });
        maintainerObjectList.push({
          username: username,
          packageNames: result.sort(),
        });
      });
    });

  return maintainerObjectList.sort((a, b) =>
    a.username > b.username ? 1 : -1, 
  );
};

function checkedPackages(username, packageData) {
  let maintainerNamesInPackage = [];
  packageData.maintainers.forEach(i => {
    maintainerNamesInPackage.push(i.username);
  });
  if (maintainerNamesInPackage.includes(username)) {
    return true;
  }
  return false; 
}

module.exports = organiseMaintainers;
