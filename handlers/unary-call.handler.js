const { todos } = require("../globals");

// ServerUnaryCalls
module.exports.createTodo = (call, callback) => {
    console.log("----createTodo----");
    console.log("call :: ", call);
    const todoItem = {
        id: todos.length + 1,
        text: call.request.text,
    };
    todos.push(todoItem);
    callback(null, todoItem);
}

module.exports.readTodos = (call, callback) => {
    console.log("----readTodos----");
    console.log("call :: ", call);
    callback(null, { items: todos });
}