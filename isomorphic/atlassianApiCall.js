const frontendApiCall = async ({ url, type = 'GET', data, errorReturnValue }) => {
 const { AP } = window;
 const promise = new Promise((resolve, reject) => {
  AP.request({
   url,
   type,
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
  httpClient.get(
   {
    headers: {
     'Content-Type': 'application/json',
     Accept: 'application/json',
    },
    url,
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
