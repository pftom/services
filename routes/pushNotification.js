module.exports = function (
  io,
) {
  return function (req, res) {
    const { option, id } = req.query;
    // listen on `push notification` event and notify client for response
    io.emit('push notification', { option, id });
    // response note
    res.send({ option, id });
    // print a user is connect
  }
}