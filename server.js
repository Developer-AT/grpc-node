const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const { createTodo, readTodos } = require("./handlers/unary-call.handler");
const { todosServerStream } = require("./handlers/writable-stream.handler");
const { todosClientStream } = require("./handlers/readable-stream.handler");
const { todosBiDirectionalStream } = require("./handlers/duplex-stream.handler");


// Load todo.proto file
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

// Initialize server and handlers for respective RPC call
const server = new grpc.Server();
server.addService(todoPackage.Todo.service, {
    createTodo: createTodo,
    readTodos: readTodos,
    todosServerStream: todosServerStream,
    todosClientStream: todosClientStream,
	todosBiDirectionalStream: todosBiDirectionalStream
});

// Bind and start the server
server.bindAsync(
    "0.0.0.0:4000",
    grpc.ServerCredentials.createInsecure(),
    (err, response) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Bind response::", response);
            server.start();
            console.log("Server Started to Manage Todos");
        }
    }
);