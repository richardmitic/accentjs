module.exports = {
  range: range
}


/*
  Return a range of characters based on unicode code points
*/
function range(start,stop) {
  var result=[];
  for (var idx=start; idx <=stop; ++idx){
    result.push(String.fromCharCode(idx));
  }
  return result;
};