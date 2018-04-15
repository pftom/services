/*
 *  TODO: Test new nowOutContestantUsernames variable
 *
 *
 */


module.exports = function (
  questions,
) {
  return function (req, res) {


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
  }
}