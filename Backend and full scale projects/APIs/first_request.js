// var request = require("request");
// request('http://www.google.com', function(error, response, body){
//     if(error)
//     {
//         console.log("something went wrong");
//     }
//     else{
//         if(response.statusCode == 200)
//         {
//             console.log(body);
//         }
//     }
// });
//learn about request promise too
var request = require("request");
request('https://jsonplaceholder.typicode.com/users/1', (error, response, body)=>{
    //eval(require('locus'));
    if(!error && response.statusCode == 200)
    {
        var parsedData = JSON.parse(body);
        console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
    }
});
