module.exports = function (
  io,
  nowPlayers,
  varAllContestants,
) {
  return function (req, res) {
    try {
      const { username } = req.query;
      let nowUser = null;
      // all players username array
      const playerUsernames = nowPlayers.map(user => user.username);
  
      if (playerUsernames.includes(username)) {
        // if judge error in frontend, give repair method
        varAllContestants = varAllContestants.map(user => {
          if (user.username === username) {
            nowUser = { ...user, out: false };
            return nowUser;
          }
  
          return user;
        });
      } else {
        varAllContestants = varAllContestants.map(user => {
          if (user.username === username) {
            nowUser = { ...user, out: false, score: user.score + 1 };
            return nowUser;
          }
  
          return user;
        });
      }

      io.emit('score', nowUser);
      res.send(JSON.stringify('Successfully responsed'));

      return varAllContestants;
    } catch (e) {
      res.status(500).send({ error: 'Sorry, meet some error'});
    }
  }
}