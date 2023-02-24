

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');


// Load todo.proto File
const packageDef = protoLoader.loadSync('./../todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

// Metadata for RPC call
let meta =new grpc.Metadata();
meta.add('Authorization', '123456')

// Read Input from user
const todos = []
todos.push(process.argv[2]);
todos.push(process.argv[3]);
todos.push(process.argv[4]);

// Intialize Client & create Service stub
const serviceStub = new todoPackage.Todo('localhost:4000', grpc.credentials.createInsecure())

// Service Call
const serviceCall = serviceStub.todosClientStream((err, response) => {
    if(err){
        console.error('Error From Server :: ', err);
    }
     console.log(`Response from server :: `, response);
});

//Write data to Stream
(async () => {
    for(let todo of todos){
        serviceCall.write({
            id: -1,
            text: todo
        })
    }

    // End Stream from Client Stub
    serviceCall.end();
})();