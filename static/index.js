/**
 * Add a hello world right at the top to make sure the Javascript is loaded
 */


console.log("Hello world");
let num1 = "";
let num2 = "";

/**
 * Success is called when the answer is returned from the server. This
 * updates the answer text to the answer returned by the server
 */
function success(data) {
    console.log("success=" + data);
    $("#answer").text("Answer=" + data);
}

/**
 * Given the op and the numbers, send the operands to the server and
 * set up the success function to receive the answer once the server has
 * calculated it.
 */
function send(op, num1, num2) {
    let url = "/calculate/op/" + op + "/num1/" + num1 + "/num2/" + num2;
    console.log(url);
    $.get(url, success);
}

// check to see inputs 
function checkSingleValue(num1, num2){
	let flag = false;
	// check to see if num1 and num2 both contain text
	if (num1.length > 0 && num2.length > 0){
		flag = true;
	}
	return flag;
}

// check for noOP 
function checkNoOp(num1, num2) {
    let flagCheck = false;
    console.log("we are now in the checkNoOp "); 
    // are both num1 and num2 empty
    if (num1.length === 0 && num2.length === 0) {
        flagCheck = true; 
    }
	
	return flagCheck; 
}

// check for binary value 
function isBinary(str) {
	let BinaryFlag = true
	for(let i = 0; i < str.length; i++){
		if(str.charAt(i) != '0' && str.charAt(i) != '1'){
			BinaryFlag = false;
		}
	}
	return BinaryFlag;
}


// create a boolean in check for num 
// Test for second task 
// make another function check input check to see if there are 0's and 1's in the for loop to check each character, 
// if not alert the user, convert num1 and num2 into a string 


/**
 * Handle the user clicking on the Not button
 */
 // Not only requires just one input from the user 
 // check each input 
function doNot() {
    console.log("we got here... "); 
    let ValidInput = true; 
    // send a NOT command to the server with the first number
     num1 = $("#num1").val();
    //send("NOT", num1);
     num2 = $("#num2").val(); 
    // check to see 
    //check for noOp
	if (checkNoOp(num1, num2) === true){
	    console.log("got a no-op "); 
	    ValidInput = false; 
	    alert("Enter a value please... "); 
	} 
	if (checkSingleValue(num1, num2) === true) {
		//consider the operation needed 
		ValidInput = false;
		alert("Please put your value into the top box "); 
		
	}  
	if(isBinary(num1) === false){
		// package up string and send to server
		ValidInput = false; 
		 alert("Please enter a binary value "); 
	}
	if (ValidInput === true) {
	    send("NOT", num1, "1"); 
	}
    
}

function errorHandling(num1, num2) {
    errorFlag = false; 
    // check to see if there are two inputs with the same length 
    if (num1.length !== num2.length) {
        errorFlag = true; 
        alert("Please enter the same length for both inputs "); 
    } 
    // checks to see if numbers are binary 
    if (isBinary(num1, num2)=== false) {
        errorFlag = true; 
        alert("Please enter a binary value "); 
    }
    if (num1.length ===0 && num2.length === 0) {
        errorFlag = true; 
        alert(" Please enter values for both boxes "); 
    }
    return errorFlag; 
    
    
}


/**
 * Handle the user clicking the OR button
 */
 // require two inputs from the user 
 // the inputs need to be the same length 
function doOr(num1, num2) {
    num1 = $("#num1").val();
    num2 = $("#num2").val();
    //call errorHandling method 
    if (errorHandling(num1, num2)!== true) {
        send("OR", num1, num2); 
        
    }
}

/**
 * Handle the user clicking the AND button
 */
 // require two inputs from the user 
 // the inputs must be the same length 
function doAnd(num1, num2) {
     num1 = $("#num1").val();
     num2 = $("#num2").val();
    if (errorHandling(num1, num2) !== true) {
       send("AND", num1, num2);
    }
    // probably should get two numbers and do And
}

/**
 * This function is called on document ready to set up the handlers
 * that are called when each button is clicked
 */
function setup() {
    $("#not").click(doNot);
    $("#or").click(doOr);
    $("#and").click(doAnd);
}

/**
 * When the document has fully loaded and is ready, call the setup function
 */
$(document).ready(setup);