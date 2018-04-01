let { singleOptions, multiplyOptions } = require('../utils/random');
let { 
  singleOptionIndex,
  multiplyOptionIndex,
} = require('../index');
const {
  io,
} = require('../index');


module.exports = function (req, res) {
  const { option } = req.query;
  let id = 0;

  if (option === 'single') {
    id = singleOptions[singleOptionIndex];
    singleOptionIndex++;
  } else {
    id = multiplyOptions[multiplyOptionIndex];
    multiplyOptionIndex++;
  }
  // listen on `push notification` event and notify client for response
  io.emit('push notification', { option, id });
  // response note
  res.send(JSON.stringify('Successfully responded'));
  // print a user is connect
}