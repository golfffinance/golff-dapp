/* eslint-disable */
import axios from 'axios';

axios.defaults.validateStatus = function (status) {
  return status < 500;
};
// axios.defaults.timeout = 6000
const thisHttp = {
  method: 'get',
  url: ''
};

axios.interceptors.request.use((config) => {
    if(config.type === 'json'){
        config.headers['Content-Type'] = 'application/json';
    }
    thisHttp.url = config.url;
    for (let key in config.params) {
      if (config.params[key] === null || config.params[key] === '') {
        delete config.params[key];
      }
    }
    return config;
  }, (err) =>
  // Do something with request error
  Promise.reject(err)
);

axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    return Promise.resolve(res)
  } else {
    return Promise.reject(res)
  }

}, (err) => {
  return Promise.reject(err)
})

export default axios
