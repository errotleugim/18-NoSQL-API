const { Schema, model } = require('mongoose');

// Schema to create Student model
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      max_length: 50,
    },
    username: {
      type: String,
      required: true,
      //reference user id?,
    },
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
