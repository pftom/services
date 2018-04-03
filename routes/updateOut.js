module.exports = function (
  io,
  nowPlayers,
  varAllContestants,
) {
  return function (req, res) {
    try {
      const { username } = req.query;
      let nowUser = null;
      let needReturnItme = null;
      
      const playerUsernames = nowPlayers.map(item => item.username);
      console.log('username', username);

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
        // if audience, update not out players score
        varAllContestants = varAllContestants.map(user => {
          if (user.username === username) {
            nowUser = { ...user, out: true };

            varAllContestants = varAllContestants.map(user => {
              if (playerUsernames.includes(user.username) && !user.out) {
                return { ...user, score: user.score + 1 };
              }
    
              return user;
            });

            nowPlayers = nowPlayers.map(user => {
              if (playerUsernames.includes(user.username) && !user.out) {
                return { ...user, score: user.score + 1 };
              }
    
              return user;
            });

            return nowUser;
          }

          return user;
        })
      }
  
      // if players, just notify client to update out status
      io.emit('score', nowUser);

      // if not players, update all players
      if (!playerUsernames.includes(username)) {
        io.emit('players', nowPlayers)
      }

      // return response
      res.send(JSON.stringify('Successfully responsed'));
      return {
        newNowPlayers: nowPlayers,
        newVarAllContestants: varAllContestants,
      };
    } catch (e) {
      res.status(500).send({ error: 'Sorry, meet some error'});
    }
  }
}