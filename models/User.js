const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //Validate with regex later
    },
    thoughts: {
      type: Schema.Type.ObjectId,
      ref: "thoughts"
    },
    friends: {
      type: Schema.Type.ObjectId,
      ref: "friends,"
    },

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})
const User = model('User', UserSchema);

module.exports = User;
