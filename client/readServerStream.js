const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');


// Load todo.proto File
const packageDef = protoLoader.loadSync("./../todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

// Intialize Client & create Service stub
const serviceStub = new todoPackage.Todo("localhost:4000", grpc.credentials.createInsecure())

// Invoke service to recive data from Stream
const serviceCall = serviceStub.todosServerStream();

// Event To read data from Stream
serviceCall.on('data', (response) => {
  console.log('Receive data from Server', response);
});

// Event to handle end of stream
serviceCall.on('end', () => {
  console.info(`Stream Closed by Server Stub`);
});