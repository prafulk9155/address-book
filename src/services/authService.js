const AUTH_TOKEN_KEY = 'token';
const USER_KEY = 'user';
const USER_ID_KEY = 'userId'; 
 

const setToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};

const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};


const setUserId = (userId) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

const removeUserId = () => {
  localStorage.removeItem(USER_ID_KEY);
};


export default {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
  setUserId,
  getUserId,
  removeUserId,
  
};
