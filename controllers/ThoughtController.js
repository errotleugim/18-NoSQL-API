const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
     .populate({path: 'reactions', select: '-__v'})
     .select('-__v')
     .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getThoughtById({params}, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: course.students } })
      )
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course

  updateThought({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with that id' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(thoughtData => {
    if (!thoughtData) {
        res.status(404).json({message: 'No thoughts with that id'});
        return;
    }
    res.json(thoughtData);
    })
    .catch(err => res.status(400).json(err))

},

// Delete a reaction by ID
deleteReaction({params}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(reactionData => {
        if (!reactionData) {
            res.status(404).json({message: 'No thoughts with that id'});
            return;
        }
        res.json(reactionData);
    })
    .catch(err => res.status(400).json(err));
}

};

