const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');


// Load todo.proto File
const packageDef = protoLoader.loadSync("./../todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

// Intialize Client & create Service stub
const serviceStub = new todoPackage.Todo("localhost:4000", grpc.credentials.createInsecure())

// Receive Data from Server
serviceStub.readTodos({}, (err, response) => {
  if(err){
    console.error('Error From Server :: ', err);
  }
  console.log(`Response from server :: `, response);
});