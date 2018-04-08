/*
 *  TODO: Test new nowOutContestantUsernames variable
 *
 *
 */


module.exports = function (
  questions,
  nowOutContestantUsernames,
) {
  return function (req, res) {
    // store a copy of nowOutContestantUsernames for test usage
    const copyNowOutContestantUsernames = nowOutContestantUsernames;

    // a new question, empty nowOutContestantUsernames
    nowOutContestantUsernames = [];


    const id = req.params.id;
    
    if (Number(id) > questions.length) {
      res.status(404).send({ error: 'This question is not exist.' });
    } else {
      const question = questions[id];
      
      res.json(question);
    }

    return {
      newNowOutContestantUsernames: nowOutContestantUsernames,
    };
  }
}