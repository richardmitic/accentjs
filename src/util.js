module.exports = {
  range: range,
  rangeFromValues: rangeFromValues,
}

/*
  Return a range of characters
*/
function range(start,stop) {
  var result=[];
  for (var idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
    result.push(String.fromCharCode(idx));
  }
  return result;
};


/*
  Return a range of characters based on unicode values
*/
function rangeFromValues(start,stop) {
  var result=[];
  for (var idx=start; idx <=stop; ++idx){
    result.push(String.fromCharCode(idx));
  }
  return result;
};