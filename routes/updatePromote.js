module.exports = function (
  io,
  varAllContestants,
) {
  return function (req, res) {
    try {

      const { username } = req.query;
      let nowUser = null;
  
      varAllContestants = varAllContestants.map(user => {
        if (user.username === username) {
          nowUser = { ...user, out: false, score: user.score + 1 };
          
          return nowUser;
        }

        return user;
      });

      io.emit('score', nowUser);
      res.send({
        username,
      });

      return varAllContestants;
    } catch (e) {
      res.status(500).send({ error: 'Sorry, meet some error'});
    }
  }
}