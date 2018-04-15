module.exports = function (
  io,
  varAllContestants,
) {
  return function (req, res) {
    const { username } = req.query;

    // judge whether user is valid
    let isValidUser = false;

    // is already logged
    let isAlreadyLogged = false;

    // update the logged status
    varAllContestants = varAllContestants.map(item => {
      // this user exist
      if (item.username === username)  {
        // if this audience is already log in, judge error
        if (item.logged) {
          isAlreadyLogged = true;
          return item;
        }

        // else is valid user
        isValidUser = true;
        return { ...item, logged: true };
      }

      return item;
    });

    if (isAlreadyLogged) {
      return res.status(403).send({ error: 'This user is already logged in', logged: true });
    }

    if (isValidUser) {
      io.emit('logged', { username });
      res.send({ 
        username,
      });

      return varAllContestants;
    } 
    
    
    res.status(404).send({ error: 'This login is not valid' })
  }
}