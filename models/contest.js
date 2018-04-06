const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  varAllContestants: [
    {
      id: mongoose.Types.ObjectId,
    }
  ]
})