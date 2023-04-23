import { urlChangeEvent } from "../events/urlChange.js";

export const Todo = () => {
  console.log('hi')
  return `
    <h3> <button id="logout">logout</button> </h3>
    <article>
      <h2>
        New Todo:
      </h2>
      <div class="form">
        <input id="titleInput" name="title" placeholder="title">
        <input id="contentInput" name="content" placeholder="title">
        <select id="completedInput" name="isCompleted">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <div class="controls">
          <button id="resetBtn" class="reset">reset</button>
          <button id="submitBtn" class="submit">submit</button>
        </div>
      </div>
    </article>
    <table id="table">
      <tr>
        <th>title</th>
        <th>content</th>
        <th>completed</th>
        <th>option</th>
      </tr>
    </table>
  `
}

// reset the inputs
const reset = (contentInput, titleInput, completedInput) => {
  contentInput.value = titleInput.value = completedInput.value = '';
}

// validate inputs
const isValidate = (contentInput, titleInput, completedInput) => {
  if (
    (contentInput.value === '') ||
    (titleInput.value === '') ||
    (completedInput.value === '')
  ) return false;

  return true;
}

// add a new todo to a table
const addTodoToTable = (table, todo) => {
  const row = document.createElement('tr');
  const titleCell = document.createElement('td');
  const contentCell = document.createElement('td');
  const completedCell = document.createElement('td');
  const deleteBtnCell = document.createElement('td');
  const deleteBtn = document.createElement('button');

  contentCell.innerText = todo.content;
  titleCell.innerText = todo.title;
  completedCell.innerText = todo.isCompleted;

  deleteBtn.innerText = 'Delete';
  deleteBtnCell.append(deleteBtn);

  deleteBtn.addEventListener('click', async () => {
    const id = row.getAttribute('id');
    // delete from web service
    fetch('http://127.0.0.1:3000/todos/' + id, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) return row.remove();
      
      alert('delete problem');
    }).catch((err) => {
      alert('error');
      console.log('[delete todo]: ' + err);
    })
  });

  row.setAttribute('id', todo._id);
  row.append(contentCell);
  row.append(titleCell);
  row.append(completedCell);
  row.append(deleteBtnCell);

  table.append(row);
}

// load todos
const loadTodos = async (table) => {
  try {
    const res = await fetch('http://127.0.0.1:3000/todos');
    const todos = await res.json();
    for (const todo of todos) {
      addTodoToTable(table, todo);
    }
  } catch (err) {
    alert('error at loading todos');
    console.log('[load todos]: ' + err);
  }
}

export const listners = async () => {
  // buttons
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const logoutBtn = document.getElementById('logout');
  // elemets
  const table = document.getElementById('table');
  // inputs
  const contentInput = document.getElementById('contentInput');
  const titleInput = document.getElementById('titleInput');
  const completedInput = document.getElementById('completedInput');
  // reset
  reset(contentInput, titleInput, completedInput);
  // load todos
  await loadTodos(table);

  // add a new todo
  submitBtn.addEventListener('click', () => {
    // extract data from table
    if (isValidate(contentInput, titleInput, completedInput)) {
      const todo = {
        content: contentInput.value,
        title: titleInput.value,
        isCompleted: (completedInput.value === 'true')? true: false
      };

      fetch('http://127.0.0.1:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      }).then((res) =>  res.json() )
        .then((data) => {
          if (!data.error) {
            addTodoToTable(table, data);
            reset(contentInput, titleInput, completedInput);
            return;
          }

          alert('The todo had been not added');
        })
        .catch((err) => {
          alert('Error');
          console.log('[add todo]: ' + err);
        })

    } else {
      alert('validate the form please');
    }
  });
  // reset the form
  resetBtn.addEventListener('click', () => {
    reset(completedInput, contentInput, titleInput);
  });
  // logout 
  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('http://127.0.0.1:3000/auth/logout', {
        method: 'POST'
      });
      window.dispatchEvent(urlChangeEvent);
    } catch (err) {
      alert('log out error');
      console.log('[log out]: ' + err);
    }
  })
}
