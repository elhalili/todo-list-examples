import { urlChangeEvent } from "../events/urlChange.js";

export const Login = () => {
  return `
  <div id="form">
    <input id="emailInput" placeholder="email">
    <input type="password" id="passwordInput" placeholder="password">
    <button id="loginBtn">login</button>
  </div>
  `
};

export const listners = () => {
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', async () => {
    const dataToSend = {
      email: emailInput.value,
      password: passwordInput.value
    };

    try {
      const res = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const message = await res.json();

      console.log(message)
      if (!message.error && !message.errors) {
        history.pushState('todos page', 'todo', location.origin + '/');
        window.dispatchEvent(urlChangeEvent);

        return;
      }

      alert(message.error || message.errors);
    } catch (err) {
      console.log('[login]: ' + err);
      alert('error');
    }
  })
}