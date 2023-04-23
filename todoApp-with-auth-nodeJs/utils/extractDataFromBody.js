module.exports.registerData = (body) => {
  return {
    fullName: body.fullName,
    email: body.email,
    password: body.password
  }
};

module.exports.loginData = (body) => {
  return {
    email: body.email,
    password: body.password
  };
};

module.exports.todoData = (body) => {
  return {
    title: body.title,
    content: body.content,
    isCompleted: body.isCompleted
  }
};