const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');


// Load todo.proto File
const packageDef = protoLoader.loadSync("./../todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

// Metadata for RPC call
let meta =new grpc.Metadata();
meta.add('Authorization', '123456')

// Read Input from user
const text = process.argv[2];

// Intialize Client & create Service stub
const serviceStub = new todoPackage.Todo('localhost:4000', grpc.credentials.createInsecure())

// Send data to Server
serviceStub.createTodo({
  "id": -1,
  "text": text
}, meta, (err, response) => {
  if(err){
    console.error('Error From Server :: ', err);
  }
  console.log(`Response from server :: `, response);
})