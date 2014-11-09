function binSearch (arrayy, element) { 
  var mid = Math.floor((arrayy.length/2));
  var begin = 0;
  var end = arrayy.length-1;
  while (mid  >= begin  && mid  <= end ) {
    var midEl = arrayy[mid];
    if (element  > midEl ) {
      begin = mid+1 
      newMid = Math.floor(((begin+end)/2));
      mid = newMid 
    } else if (element  < midEl ) {
      end = mid-1 
      newMid = Math.floor(((begin+end)/2));
      mid = newMid 
    } else {
      return mid;
    } 
  } 
  return false;
} 

