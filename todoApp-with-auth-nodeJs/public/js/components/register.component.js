import { urlChangeEvent } from "../events/urlChange.js";

export const Register = () => {
  return `
  <div id="form">
    <input id="fullNameInput" placeholder="full name">
    <input id="emailInput" placeholder="email">
    <input type="password" id="passwordInput" placeholder="password">
    <button id="registerBtn">register</button>
  </div>
  `;
}

export const listners = () => {
  const fullNameInput = document.getElementById('fullNameInput');
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const registerBtn = document.getElementById('registerBtn');

  registerBtn.addEventListener('click', async () => {
    console.log('err')
    const dataToSend = {
      fullName: fullNameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    try {
      const res = await fetch('http://127.0.0.1:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const message = await res.json();

      console.log(message)
      if (!message.error && !message.errors) {
        history.pushState('login page', 'login', location.origin + '/login');
        window.dispatchEvent(urlChangeEvent);

        return;
      }

      alert(message.error || message.errors);
    } catch (err) {
      console.log('[register]: ' + err);
      alert('error');
    }
  })
}