var singleTotalNumber = 90;
var multiplyTotalNumber = 45;

function getRandom(totalNumber, arr) {
  while (arr.length < totalNumber) {
    var random = Math.floor(Math.random() * totalNumber);
    
    if (!arr.includes(random)) {
      arr.push(random);
    }
  }

  return arr;
}

var singleOptions = getRandom(singleTotalNumber, []);
var multiplyOptions = getRandom(multiplyTotalNumber, []);

module.exports = {
  singleOptions,
  multiplyOptions,
};