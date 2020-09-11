const moduleInt = require("./interpreter"),
     interpreter = moduleInt[0],
     st = moduleInt[1],
     code = `

          3:arg;
     
          {
              $arg
              1:arg
          }:testA;
     
          (testA);
          arg

          `;


let output = interpreter(code);

console.log(output)
