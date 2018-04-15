/*
 *  TODO: Test new  this file
 *
 *
 */



module.exports = function (
  io,
  nowPlayers,
  varAllContestants,
) {
  return function (req, res) {
    try {
      const { username } = req.query;
      let nowUser = null;
      
      // get all the player username array for later judge if player
      const playerUsernames = nowPlayers.map(item => item.username);

      // if players, just update out status
      if (playerUsernames.includes(username)) {
        varAllContestants = varAllContestants.map(user => {
          if (user.username === username) {
            nowUser = { ...user, out: true };

            return nowUser;
          }

          return user;
        });

        nowPlayers = nowPlayers.map(user => {
          if (user.username === username) {
            return { ...user, out: true };
          }

          return user;
        });
      } else {
        varAllContestants = varAllContestants.map(user => {
          if (user.username === username) {
            nowUser = { ...user, out: true };

            return nowUser;
          }

          return user;
        });
      }
  
      // if players, just notify client to update out status
      io.emit('score', nowUser);

      // return response
      res.send({ msg: 'successfully response' });
      return {
        newNowPlayers: nowPlayers,
        newVarAllContestants: varAllContestants,
      };
    } catch (e) {
      res.status(500).send({ error: 'Sorry, meet some error'});
    }
  }
}