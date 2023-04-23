import { urlChangeEvent } from "../events/urlChange.js";

export const authHeader = () => {
  return `
      <a href="" id="register-link">register</a>
      <a href="" id="login-link">login</a>
  `
}

export const listners = () => {
  const registerLink = document.getElementById('register-link');
  const loginLink = document.getElementById('login-link');

  registerLink.addEventListener('click', (e) => {
    e.preventDefault();

    history.pushState('register page', 'register', location.origin + '/register');
    window.dispatchEvent(urlChangeEvent);
  });

  loginLink.addEventListener('click', (e) => {
    e.preventDefault();

    history.pushState('login page', 'login', location.origin + '/login');
    window.dispatchEvent(urlChangeEvent);
  });
}