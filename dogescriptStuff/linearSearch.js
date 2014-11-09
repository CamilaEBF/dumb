function linearSearch (arrayy, element) { 
for ( var i  = 0 ; i  < arrayy.length ; i  += 1 ) {
if (arrayy[i]  === element ) {
return i;
} 
} 
return false;
} 

var testArray = new Array(1, 2, 3, 4, 5);
var rand = Math.random();
var randd = rand*testArray.length;
var testElement = Math.ceil(randd);
var testNeg = 0;

// positive and negative control 
var resultPos = linearSearch(testArray, testElement);
var assertionPos = !!resultPos === true ;
console.log(assertionPos);
var resultNeg = linearSearch(testArray, testNeg);
var assertionNeg = !!resultNeg === false ;
console.log(assertionNeg);

