const todoValidator = require('../validators/todo');
const findErrors = require('../middlewares/findErrors');
const { todoData } = require('../utils/extractDataFromBody');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');

// all this functionality is for a the current user

// get list of todos
module.exports.TodoList = [
  async (req, res) => {
    try {
      const userId = req.session.userId;
      const user = await User.findById(userId);
      const todos = user.todos;
      res.json(todos);

    } catch (err) {
      console.log('[TodoList]: ' + err);
      res.status(500).json({
        error: 'try later'
      });
    }
  }
]

// get a special todo
module.exports.TodoDetail = [
  async (req, res) => {
    try {
      const userId = req.session.userId;
      const todoId = req.params.id;
      const user = await User.findById(userId);

      const todo = user.todos.find(e => e._id == todoId);
      
      if (todo) return res.json(todo);
      res.status(404).json({});
    } catch (err) {
      console.log('[TodoDetails]: ' + err);
      res.status(500).json({
        error: 'try later'
      });
    }
  }
]
// save a new todo
module.exports.TodoStore = [
  ...todoValidator,
  findErrors,
  async (req, res) => {
    try {
      const userId = req.session.userId;
      const todo = todoData(req.body);
      const user = await User.findById(userId);

      user.todos.push(todo);

      await user.save();

      res.json(user.todos[user.todos.length - 1]);
    } catch (err) {
      console.log('[TodoStore]: ' + err);
      res.status(500).json({
        error: 'try later'
      });
    }
  }
]

// TODO: find a better way to update a todo
module.exports.TodoUpdate = [
  ...todoValidator,
  findErrors,
  async (req, res) => {
    try {
      const userId = req.session.userId;
      const todoId = req.params.id;

      const updatedTodo = todoData(req.body);
      const user = await User.findById(userId);

      // improve this way
      user.todos = user.todos.map(todo => (todo._id == todoId)?{ ...todo, ...updatedTodo }: todo);

      await user.save();
      res.json(updatedTodo);
    } catch(err) {
      console.log('[TodoUpdate]: ' + err);
      res.status(500).json({
        error: 'try later'
      });
    }
  }
]

// TODO: find a way to delete the todo
module.exports.TodoDelete = [
  async (req, res) => {
    try {
      const userId = req.session.userId;
      const todoId = req.params.id;
      const user = await User.findById(userId);

      user.todos.pull({ _id: todoId })
      
      await user.save();
      res.json({});
    } catch(err) {
      console.log('[TodoRemove]: ' + err);
      res.status(500).json({
        error: 'try later'
      });
    }

  }
]