const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
    SALT_WORK_FACTOR = 10;

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
        required: true,
        default: 0
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    // TODO: check if the correct form is (same for purchased_itinerary)
    // saved_itinerary: [ItinerarySchema],
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

UserSchema.pre('save', function(next) {
  var user = this;
  console.log(user)

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          console.log(user.password)
          next();
      });
  });
});
   
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
   
module.exports = mongoose.model('User', UserSchema);

// // hash user password
// UserSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//     console.log(this.password)
//   }

//   next();
// });

// // custom method to compare and validate password for logging in
// UserSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// // when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// // UserSchema.virtual('ItineraryCount').get(function () {
// //   return this.savedItinerary.length;
// // });
// // when we query a user, we'll also get another field called `itineraryCount` with the number of saved books we have
// // TODO: this function is causing the code to break.
// // UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'length' of undefined
// // UserSchema.virtual('ItineraryCount').get(function () {
// //   return this.savedItinerary.length;
// // });

const User = model('User', UserSchema);

module.exports = User;