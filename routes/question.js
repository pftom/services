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


    let { term, id } = req.query;
    console.log('term', Number(term), id);

    if (isNaN(Number(term)) || isNaN(Number(id))) {
      res.status(404).send({ error: 'Term or id should be integer' });
      return;
    }

    if ((Number(term) >= questions.length) || (Number(id) >= questions[Number(term)].length)) {
      res.status(404).send({ error: 'Term or id is exceed limit' });
      return;
    }
    
    term = Number(term);
    id = Number(id);
    const question = questions[term][id];
    
    res.json(question);

    return {
      newNowOutContestantUsernames: nowOutContestantUsernames,
    };
  }
}