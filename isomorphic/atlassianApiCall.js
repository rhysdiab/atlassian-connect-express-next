const frontendApiCall = async ({ url, type = 'GET', data, errorReturnValue }) => {
  const { AP } = window;
  const promise = new Promise((resolve, reject) => {
    AP.request({
      url,
      type,
      ...(data && { data: JSON.stringify(data) }),
      contentType: 'application/json',
    })
      .then(response => {
        try {
          resolve(JSON.parse(response.body));
        } catch {
          resolve(errorReturnValue);
        }
      })
      .catch(err => {
        resolve({ errorMessage: [err] });
      });
  });
  return promise;
};

const backendApiCall = async ({ url, type, data, httpClient, errorReturnValue }) => {
  const promise = new Promise((resolve, reject) => {
    switch (type) {
      case 'GET':
        httpClient.get(
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            url,
            ...(data && { body: JSON.stringify(data) }),
          },
          (err, response, body) => {
            if (err) {
              reject({ errorMessage: [err] });
            } else {
              try {
                resolve(JSON.parse(body));
              } catch {
                resolve(errorReturnValue);
              }
            }
          }
        );
        break;
      case 'POST':
        httpClient.post(
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            url,
            body: JSON.stringify(data),
          },
          (err, response, body) => {
            if (err) {
              reject({ errorMessage: [err] });
            } else {
              try {
                resolve(JSON.parse(body));
              } catch {
                resolve(errorReturnValue);
              }
            }
          }
        );
        break;

      case 'PUT':
        httpClient.put(
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            url,
            body: JSON.stringify(data),
          },
          (err, response, body) => {
            if (err) {
              reject({ errorMessage: [err] });
            } else {
              try {
                resolve(JSON.parse(body));
              } catch {
                resolve(errorReturnValue);
              }
            }
          }
        );
        break;
      case 'DELETE':
        httpClient.del(
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            url,
            body: JSON.stringify(data),
          },
          (err, response, body) => {
            if (err) {
              reject({ errorMessage: [err] });
            } else {
              try {
                resolve(JSON.parse(body));
              } catch {
                resolve(errorReturnValue);
              }
            }
          }
        );
        break;
      default:
        httpClient.get(
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            url,
            ...(data && { body: JSON.stringify(data) }),
          },
          (err, response, body) => {
            if (err) {
              reject({ errorMessage: [err] });
            } else {
              try {
                resolve(JSON.parse(body));
              } catch {
                resolve(errorReturnValue);
              }
            }
          }
        );
    }
  });
  return promise;
};

const atlassianApiCall = async ({ url, type = 'GET', data, httpClient, errorReturnValue = [] }) => {
  let payload = errorReturnValue;

  /**
   * called on backend
   */
  if (httpClient) {
    payload = await backendApiCall({ url, type, data, httpClient, errorReturnValue });
    return payload;
  }

  /**
   * called on frontend
   */
  try {
    if (window) {
      payload = await frontendApiCall({ url, type, data, httpClient, errorReturnValue });
    }
  } catch (e) {
    return;
  }

  return payload;
};

export default atlassianApiCall;
