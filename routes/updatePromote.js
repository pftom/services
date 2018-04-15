/*
 *  TODO: Test new  this file
 *
 *
 */


function filterInElement(originalArr, filterCondition) {
  return originalArr.filter(filterCondition);
}

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

      console.log('nowOutContestantUsernames', nowOutContestantUsernames);
      console.log('username', username);
      console.log('players', nowPlayers);

      // all players username array
      const playerUsernames = nowPlayers.map(user => user.username);

      // isNowPlayer or isSigned and logged audience use this circumstance
      let canGoOn = true;
      
      varAllContestants.map(user => {
        if (user.username === username) {

          if (playerUsernames.includes(username)) {
            return;
          }

          if (user.out) {
            canGoOn = false;
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
  
      if (playerUsernames.includes(username)) {
        // if judge error in frontend, give repair method
        varAllContestants = varAllContestants.map(user => {
          if (user.username === username) {
            // if player is promote,
            // update it's now score use nowOutContestantUsernames

            nowUser = { ...user, out: false, score: user.score + nowOutContestantUsernames.length };
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
      res.send({
        username,
        copyNowPlayers,
        copyVarAllContestants,
        copyNowOutContestantUsernames,
        nowPlayers,
        varAllContestants,
        nowOutContestantUsernames,
      });

      return varAllContestants;
    } catch (e) {
      res.status(500).send({ error: 'Sorry, meet some error'});
    }
  }
}