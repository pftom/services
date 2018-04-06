module.exports = function (io, varAllContestants) {
  return function (req, res) {
    // store a copy for test
    const storedVarAllContestants = [ ...varAllContestants ];
    varAllContestants = varAllContestants.map(user => ({
      ...user,
      out: false,
    }));

    // listen on `/next_contest` event and notify client for response
    io.emit('next contest', 'start response for server');
    res.send({
      storedVarAllContestants,
      varAllContestants,
    });

    return varAllContestants;
  }
}