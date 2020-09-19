/**
 * Node.js program for a logical calculator.
 *
 * When called with "/", it returns the index.html static page.
 * When called with "/calculate/op/:op/num1/:num1/num2/:num2", it returns
 * the answer of the logical calculation
 
 //Set up some global constants for the program
 const express = require('express');
 const app = express();
 const port = 80;

/**
 * The index function redirects the user to request "index.html"
 */
 
 
 const express = require('express');
 const app = express();
 //const port = 80;
//  let port = process.env.PORT;
// if (port == null || port == "") {
//     port = 80;
// }
//app.listen(port);
 //const port = 80;

// listen in on the port 
  //app.listen(process.env.PORT);
 
function index(req, res) {
    res.redirect('/index.html');
}

/**
 * Calculate the logical answer and send it back to the user
 */
 // use switch statements 
 // if operation is Not == 
 // for loop and update answer 

function calculate(req, res) {
    console.log(req.params);
    let op = req.params.op; 
    let num1 = req.params.num1; 
    let num2 = req.params.num2; 
    let answer = " "; 
    let temp = ""; 
        switch(op) {
        case "NOT" :
              for (let i = 0; i < num1.length; i++) {
                  if (num1.charAt(i)=== "0") {
                      temp += "1"; 
                  } else {
                      temp += "0"; 
                  }
              }
              answer = temp;  
                break; 
        case "AND" : 
            for (let i = 0; i < num1.length; i++) {
                if (num1.charAt(i)=== "1" && num2.charAt(i)=== "1") {
                    temp += "1"; 
                } else {
                    temp += "0"; 
                }
            }
                answer = temp; 
                break;
                
        case  "OR" :
            for (let i = 0; i < num1.length; i++) {
               if (num1.charAt(i)== "0" && num2.charAt(i) === "0") {
                   temp += "0"; 
               } else {
                   temp += "1"; 
               } 
            }
            answer = temp; 
        }

    res.send(answer);
}



// Set up the handlers for Node.js
// -------------------------------

// static files live in "static" folder
app.use(express.static("static"));

// Calling "/" invokes the index function
app.get('/', index);

// Calling "/calculate/..." invokes the calculate function
app.get('/calculate/op/:op/num1/:num1/num2/:num2', calculate);

// Start Express listening at the given port

let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}

app.listen(port, function() {
    console.log("App running at port=" + port);
});