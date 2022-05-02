const { User, Thought } = require('../models');

const userController = {
    // get all
    getAllUsers(req, res) {
        User.find({})
            .then(UserData => res.json(UserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create
    createUser({ body }, res) {
        User.create(body)
            .then(UserData => res.json(UserData))
            .catch(err => res.status(400).json(err));
    },


    // update by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(UserData => {
                if (!UserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }

            })
            .then(() => {
                res.json({ message: 'user has been deleted.' });
            })
            .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
            .then(UserData => {
                if (!UserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(UserData);
            })
            .catch(err => res.status(400).json(err));
    },

}

module.exports = userController;