const { todos } = require("../globals");

// ServerDuplexStream
module.exports.todosBiDirectionalStream = (call) => {
	console.log("----createTodoBiDirectionalStream----");
    console.log("call:: ", call);

	// handle the data stream
	call.on("data", async (payload) => {
        console.log('Receiving data from stream ::',payload);
        const todoItem = {
			id: todos.length + 1,
			text: payload.text,
		};
		todos.push(todoItem);
		console.log('Send Response to client :: ', todoItem);
		call.write(todoItem);
    });

	// if server encouters event request to end the stream
	call.on("end", async () => {
		console.log("End of stream by Client Stub");
        call.end();
    });
}