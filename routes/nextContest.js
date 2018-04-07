module.exports = function (
  io, 
  varAllContestants,
  nowOutContestantUsernames,
) {
  return function (req, res) {
    // store a copy for test
    const storedVarAllContestants = [ ...varAllContestants ];
    varAllContestants = varAllContestants.map(user => ({
      ...user,
      out: false,
    }));
    nowOutContestantUsernames = [];

    // listen on `/next_contest` event and notify client for response
    io.emit('next contest', 'start response for server');
    res.send({
      storedVarAllContestants,
      varAllContestants,
      nowOutContestantUsernames,
    });

    return {
      newNowOutContestantUsernames: varAllContestants,
      newVarAllContestants: nowOutContestantUsernames,
    };
  }
}