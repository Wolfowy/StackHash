const interpreter = require("./interpreter"),
     code = `27c "[38;2;255;123;123mTEST"+ "asd"+ 27c + "[0m" +`;

let output = interpreter(code,true);

console.log(output)
