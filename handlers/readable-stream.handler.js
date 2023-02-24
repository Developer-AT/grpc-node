const { todos } = require("../globals");

// ServerReadableStream
module.exports.todosClientStream = (call, callback) => {
    console.log("----createTodoClientStream----");
    console.log("call:: ", call);

    call.on("data", async (payload) => {
        console.log('Receiving data from stream ::',payload);
        const todoItem = {
			id: todos.length + 1,
			text: payload.text,
		};
		todos.push(todoItem);
    });

	call.on("end", async (payload) => {
		console.log("End of stream--payload :: ", payload);
		console.log('Send Response to client :: ', todos);
		callback(null, { items: todos })
    });
}