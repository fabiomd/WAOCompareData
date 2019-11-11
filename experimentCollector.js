const fs = require( 'fs' ),
      buffer = fs.readFileSync(process.argv[2]),
      arrayBuffer = new Uint8Array( buffer ).buffer,
      async = require('async');

var array = fs.readFileSync(process.argv[3]).toString().split("\n");
var listA = [];
var listB = [];
for(i in array) {
    var tuple = i.split(" ");
    listA.push(Number(tuple[0]));
    listB.push(Number(tuple[1]));
}

let numberOfTests = process.argv[4];

// create all instances
async.parallel({
    sumtwo: function(parallelCb) {
        getInstance(arrayBuffer,function(err,callback){
            parallelCb(err, {err: err, instance: callback});
        });
    }
}, function(err, results) {
    try {
       let start = new Date().getTime();
       console.log('Start: ' + start + " milissegundos");
       for (var i = 0; i < numberOfTests; i++) {
          for (var j = 0; j < listA.length; j++) {
             let firstNumber  = listA[j];
             let secondNumber = listB[j];
             let webAssemblyAddFuncResult = results.sumtwo.instance.exports.sumtwo(firstNumber,secondNumber);
          }
       }
       let end = new Date().getTime();
       console.log('End: ' + end + " milissegundos");
       let runTime = Number(end) - Number(start);
       console.log('RunTime: ' + runTime + " milissegundos");
    } catch(error) {
        console.log("error : " + error);
    }
});

// Create a instance from the arrayFile
function getInstance(arrayBuffer,callback) {
    try{
        WebAssembly.compile( arrayBuffer ).then( module => {
            let imports = {
                env : {
                    memoryBase : 0,
                    tableBase : 0
                }
            };

            if( !imports.env.memory )
                imports.env.memory = new WebAssembly.Memory({
                    initial: 256
                });

            if( !imports.env.table )
                imports.env.table = new WebAssembly.Table({
                    initial: 0,
                    element: 'anyfunc'
                });

            instance = new WebAssembly.Instance(module, imports);
            callback(null, instance);
        });        
    }catch(error){
        callback(error, null);
    } 
}
