import {
  header,
  main,
  footer
} from './config.js';
import { urlChangeEvent } from './events/urlChange.js';
import { Header } from './components/header.component.js';
import { Footer } from './components/footer.component.js';
import { Todo, listners as todoListerns } from './components/todo.component.js'; 
import { authHeader, listners as authHeaderListners } from './components/authHeader.component.js';
import { Login, listners as loginListerns } from './components/login.component.js';
import { Register, listners as registerListners } from './components/register.component.js';

window.addEventListener('url-change', async () => {
  try {
    const path = location.pathname;
    const res = await fetch('http://127.0.0.1:3000/auth/isConnected');
    const connection = await res.json();

    if (path === '/index.html' || path === '/') {
      if (connection.isConnected === true) {
        // header comp
        header.innerHTML = Header(connection.email);
        // main comp
        main.innerHTML = Todo();
        todoListerns();
        // footer comp
        footer.innerHTML = Footer('todo home');
        return;
      }

      if (connection.isConnected === undefined) {
        throw new Error('service');
      }

      history.pushState('pgq', 'tile', location.origin + '/login');
      window.dispatchEvent(urlChangeEvent);
    } else if (path === '/login') {
      // header comp
      header.innerHTML = authHeader();
      authHeaderListners();
      // main comp
      main.innerHTML = Login();
      loginListerns();
      // footer comp
      footer.innerHTML = Footer('Log in')
    } else if (path === '/register') {
      // header comp
      header.innerHTML = authHeader();
      authHeaderListners();
      // main comp
      main.innerHTML = Register();
      registerListners();
      // footer
      footer.innerHTML = Footer('register')
    } else {
      main.innerHTML = '<h1>page not found </h1>';
    }
  } catch (err) {
    main.innerHTML = '<h1>Service anvailbale</h1>';
    console.log('[router]: ' + err);
  }
});

window.dispatchEvent(urlChangeEvent);