const { Thought } = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    // get all
    getAllThoughts(req, res) {
        Thought.find({})
            .then(ThoughtData => res.json(ThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(ThoughtData => {
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // add
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => res.json(err));
    },

    // update by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(ThoughtData => {
                if (!ThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(ThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => res.json(err));
    },

    // add
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(ThoughtData => {
                if (!ThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(ThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete
    deleteReaction({ params }, res) {
        console.log(params.thoughtId, params.reactionId);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(UserData => res.json(UserData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;