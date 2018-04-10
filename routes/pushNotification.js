module.exports = function (
  io,
) {
  return function (req, res) {
    const { term, id } = req.query;

    console.log('term', term);
    console.log('id', id);

    // listen on `push notification` event and notify client for response
    io.emit('push notification', { term, id });
    // response note
    res.send({ term, id });
    // print a user is connect
  }
}