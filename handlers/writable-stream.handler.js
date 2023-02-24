const { todos } = require("../globals");

// ServerWritableStream
module.exports.todosServerStream = (call) => {
    console.log("----readTodosServerStream----");
    console.log("call:: ", call);
	for(let todo of todos){
		call.write(todo);
	}
    call.end();
}