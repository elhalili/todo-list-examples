const { 
  TodoList, 
  TodoDetail,
  TodoStore,
  TodoUpdate,
  TodoDelete 
} = require('../controllers/TodoController');
const { Router } = require('express');
const route = Router();

route.get('/', ...TodoList);
route.get('/:id', ...TodoDetail);
route.post('/', ...TodoStore);
route.put('/:id', ...TodoUpdate);
route.delete('/:id', ...TodoDelete);

module.exports = route;