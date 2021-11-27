const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const {ItinerarySchema} = require('./Itinerary');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    points: {
        type: Number,
        default: 0
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    saved_itinerary: {type: Array, "default": [{ItinerarySchema}]},
    purchased_itinerary: {type: Array, "default": [{ItinerarySchema}]},
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `itineraryCount` with the number of saved books we have
// TODO: this function is causing the code to break.
// UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'length' of undefined
// UserSchema.virtual('ItineraryCount').get(function () {
//   return this.savedItinerary.length;
// });

const User = model('User', UserSchema);

module.exports = User;