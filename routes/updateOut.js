/*
 *  TODO: Test new  this file
 *
 *
 */



module.exports = function (
  io,
  nowPlayers,
  varAllContestants,
  nowOutContestantUsernames,
) {
  return function (req, res) {
    try {
      // copy a nowPlayers, varAllContestants, nowOutContestantUsernames 
      // for test usage
      const copyNowPlayers = nowPlayers;
      const copyVarAllContestants = varAllContestants;
      const copyNowOutContestantUsernames = nowOutContestantUsernames;


      const { username } = req.query;
      let nowUser = null;
      let needReturnItme = null;

      // player or isSigned and logged 

      console.log('nowPlayers', nowPlayers);
      console.log('username', username);
      console.log('varAllContestants', varAllContestants);
      
      // get all the player username array for later judge if player
      const playerUsernames = nowPlayers.map(item => item.username);

      // isNowPlayer or isSigned and logged audience use this circumstance
      let canGoOn = true;

      varAllContestants.map(user => {
        if (user.username === username) {
          if (playerUsernames.includes(username)) {
            return;
          }

          // if not player and not signed or not logged audience,
          if (!user.logged || !user.isSigned) {
            canGoOn = false;
          }
        }
      });

      if (!canGoOn) {
        return res.send('silent failed');
      }

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
        // if audience, update out status and add out audience to nowOutContestantUsernames
        varAllContestants = varAllContestants.map(user => {
          if (user.username === username) {
            if (!user.out) {
              // judge if the username is in nowOutContestantUsernames
              if (nowOutContestantUsernames.indexOf(username) === -1) {
                nowOutContestantUsernames.push(username);
              }
            }
            nowUser = { ...user, out: true };

            return nowUser;
          }

          return user;
        });
      }
      console.log('nowUser', nowUser);
  
      // if players, just notify client to update out status
      io.emit('score', nowUser);

      // return response
      res.send({
        copyNowPlayers,
        copyVarAllContestants,
        copyNowOutContestantUsernames,
      });
      return {
        newNowPlayers: nowPlayers,
        newVarAllContestants: varAllContestants,
        newNowOutContestantUsernames: nowOutContestantUsernames,
      };
    } catch (e) {
      res.status(500).send({ error: 'Sorry, meet some error'});
    }
  }
}