const { todos } = require("../globals");

// ServerWritableStream
module.exports.todosServerStream = (call) => {
    console.log("----readTodosServerStream----");
    console.log("call:: ", call);

    // Write data to Stream
	for(let todo of todos){
		call.write(todo);
	}

    // End of Stream
    call.end();
}