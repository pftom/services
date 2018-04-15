module.exports = function (
  io,
  varAllContestants,
) {
  return function (req, res) {
    const { username } = req.query;

    // store a copy for test
    const storedVarAllContestants = [ ...varAllContestants ];

    // judge whether user is valid
    let isValidUser = false;

    // is already logged
    let isAlreadyLogged = false;

    // isPlayer
    let isPlayer = false;

    // isn't sign
    let isNotSigned = false;

    // update the logged status
    varAllContestants = varAllContestants.map(item => {
      // this user exist
      if (item.username === username)  {
        // but is already logged
        if (item.logged) {
          isAlreadyLogged = true;
        } else if (item.isPlayer) {
          isPlayer = true;
        } else if (!item.isSigned) {
          isNotSigned = true;
        } else {
          isValidUser = true;
          return { ...item, logged: true };
        }
      }

      return item;
    });

    // if this user is already logged in
    if (isPlayer) {
      res.status(403).send({ error: 'Player are not allowed login', logged: true });
    } else if (isNotSigned) {
      res.status(403).send({ error: 'Sorry, 你没有签到，不能参加比赛哦 ~', logged: true });
    } else if (isAlreadyLogged) {
      res.status(403).send({ error: 'This user is already logged in', logged: true });
    } else if (isValidUser) {
      io.emit('logged', { username });
      res.send({ 
        username,
        storedVarAllContestants,
        varAllContestants,
      });
    } else {
      res.status(404).send({ error: 'This login is not valid' })
    }

    return varAllContestants;
  }
}