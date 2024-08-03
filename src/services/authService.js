// src/services/authService.js

const AUTH_TOKEN_KEY = 'token';
const USER_KEY = 'user';
const MENU_KEY = 'menu';
const USER_ID_KEY = 'userId'; // Add a key for userId
const ROLE_ID_KEY = 'roleId'; // Add a key for role

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

const setMenu = (menu) => {
  localStorage.setItem(MENU_KEY, JSON.stringify(menu));
};

const getMenu = () => {
  return JSON.parse(localStorage.getItem(MENU_KEY));
};

const removeMenu = () => {
  localStorage.removeItem(MENU_KEY);
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

const setRole = (role) => {
  localStorage.setItem(ROLE_ID_KEY, role);
};

const getRole = () => {
  return localStorage.getItem(ROLE_ID_KEY);
};

const removeRole = () => {
  localStorage.removeItem(ROLE_ID_KEY);
};

export default {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
  setMenu,
  getMenu,
  removeMenu,
  setUserId,
  getUserId,
  removeUserId,
  setRole,
  getRole,
  removeRole,
};
