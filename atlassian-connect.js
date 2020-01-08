const atlassianConnectJSON = require('./atlassian-connect.json');

exports.atlassianConnectJSON = function(localBaseUrl) {
  const newAtlassianConnectJSON = atlassianConnectJSON;
  newAtlassianConnectJSON.baseUrl = localBaseUrl;
  return newAtlassianConnectJSON;
};
