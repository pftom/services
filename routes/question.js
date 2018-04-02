module.exports = function (questions) {
  return function (req, res) {
    const id = req.params.id;
    
    if (Number(id) > questions.length) {
      res.status(404).send({ error: 'This question is not exist.' });
    } else {
      const question = questions[id];
      
      res.json(question);
    }
  }
}