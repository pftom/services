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

      // valid user which is logged
      const validUsers = varAllContestants.slice(1).filter(user => user.logged);

      // get rid of players
      const validGetRidOfPlayersUser = validUsers.filter(
        user => !playerUsernames.includes(user.username)
      );

      console.log('validGetRidOfPlayersUser', validGetRidOfPlayersUser);
      console.log('playerUsernames', playerUsernames);
      console.log('username', username);

      // calculate score
      // or const score = validGetRidOfPlayersUser.filter(user => user.out).length;
      const score = validGetRidOfPlayersUser.length - 
        validGetRidOfPlayersUser.filter(user => !user.out).length;

      console.log('score', score);
  
      // update all local varAllContestants
      varAllContestants = varAllContestants.map(item => {
        // update the user to out of this contest, 
        needReturnItme = item;
  
        if (item.username === username) {
          if (playerUsernames.includes(username)) {
            needReturnItme = Object.assign({}, needReturnItme, { out: true, score: item.score + score });
          } else {
            needReturnItme = Object.assign({}, needReturnItme, { out: true });
          }
          nowUser = needReturnItme;
        }
  
        return needReturnItme;
      });
  
      // notify master side for update rank list
      io.emit('score', nowUser);

      // return response
      res.send(JSON.stringify('Successfully responsed'));
    } catch (e) {
      res.status(500).send({ error: 'Sorry, meet some error'});
    }

    return varAllContestants;
  }
}