import axios from 'axios';
import * as cookie from 'js-cookie';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, URL_API } from '../utils/common';

const internals = {};

const instance = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Request interceptor
 * Add Authorization header if it exists
 * This configuration applies for all requests
 */
instance.interceptors.request.use(
  reqConfig => {
    const token = cookie.get(TOKEN_KEY);
    if (token) {
      reqConfig.headers['Authorization'] = `Bearer ${token}`;
    }
    return reqConfig;
  },
  error => Promise.reject(error)
);

/**
 * Response interceptor
 * Catch basic errors like 401 and redirect to login
 * This configuration applies for all responses
 */
instance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    // Do something with response error
    if (typeof error === 'undefined') {
      // request cancelled
      // when backend server is not available at all
    } else if (typeof error.response === 'undefined') {
      // when request is timeout
    } else if (error.response.status === 401) {
      // apply refresh token logic here instead of redirecting to login
      const accessToken = cookie.get(TOKEN_KEY);
      const refreshToken = cookie.get(REFRESH_TOKEN_KEY);
      if (accessToken && refreshToken) {
        const data = {
          returnUrl: '',
          accessToken,
          refreshToken
        };
        internals
          .post('/Account/RefreshToken', data)
          .then(res => {
            if (res?.content?.token && res?.content?.refreshTokens) {
              cookie.set(TOKEN_KEY, res.content.token);
              cookie.set(REFRESH_TOKEN_KEY, res.content.refreshTokens);
            }
          })
          .then(() => {
            originalRequest.headers.Authorization = 'Bearer ' + getCookie();
            return axios(originalRequest);
          });
      }
    } 
    return Promise.reject(error);
  }
);

internals.get = (url, params, options) => {
  let config = {
    method: 'GET',
    url: url,
    params
  };
  config = Object.assign(config, options);
  return instance(config)
    .then(response => response.data)
    .catch(error => {
      if (error && error.response) {
        throw error.response.data;
      }
      throw error;
    });
};

internals.post = (url, payload, options) => {
  let config = {
    method: 'POST',
    url: url,
    data: payload
  };
  config = Object.assign(config, options);
  return instance(config)
    .then(response => response.data)
    .catch(error => {
      if (error && error.response) {
        throw error.response.data;
      }
      throw error;
    });
};

internals.put = (url, payload, options) => {
  let config = {
    method: 'PUT',
    url: url,
    data: payload
  };
  config = Object.assign(config, options);
  return instance(config)
    .then(response => response.data)
    .catch(error => {
      if (error && error.response) {
        throw error.response.data;
      }
      throw error;
    });
};

internals.delete = (url, payload, options) => {
  let config = {
    method: 'DELETE',
    url: url,
    data: payload
  };
  config = Object.assign(config, options);
  return instance(config)
    .then(response => response.data)
    .catch(error => {
      if (error && error.response) {
        throw error.response.data;
      }
      throw error;
    });
};

export default internals;
export { instance };
