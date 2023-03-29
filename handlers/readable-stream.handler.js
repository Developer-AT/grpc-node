const { todos } = require("../globals");

// ServerReadableStream
module.exports.todosClientStream = (call, callback) => {
    console.log("----createTodoClientStream----");
    console.log("call:: ", call);

	// handle the data stream
    call.on("data", async (payload) => {
        console.log('Receiving data from stream ::',payload);
        const todoItem = {
			id: todos.length + 1,
			text: payload.text,
		};
		todos.push(todoItem);
    });

	// if server encouters event request to end the stream
	call.on("end", async () => {
		console.log("End of stream by Client Stub");
		console.log('Send Response to client :: ', todos);
		callback(null, { items: todos })
    });
}