module.exports = function (io, varAllContestants) {
  return function (req, res) {
    varAllContestants = varAllContestants.map(user => ({
      ...user,
      out: false,
    }));

    // listen on `/next_contest` event and notify client for response
    io.emit('next contest', 'start response for server');
    res.send(JSON.stringify('Successfully responsed'));
  }
}