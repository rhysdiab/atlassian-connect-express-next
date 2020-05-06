export const atlassianApiCall = async ({ url, type = 'GET', data }) => {
  const { AP } = window;
  const promise = new Promise((resolve, reject) => {
    AP.request({
      url,
      type,
    })
      .then(resonse => {
        try {
          resolve(JSON.parse(resonse.body));
        } catch {
          resolve([]);
        }
      })
      .catch(err => {
        resolve({ errorMessage: [err] });
      });
  });
  return promise;
};
