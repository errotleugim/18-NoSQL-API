const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');
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
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
