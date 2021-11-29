require('dotenv').config();
const router = require('express').Router();
const { User, Itinerary } = require('../../models')
const {
  createUser,
  getSingleUser,
  saveItinerary,
  deleteItinerary,
  login,
} = require('../../controllers/user-controller');
const jwt = require('jsonwebtoken');

// import middleware
const { authMiddleware, signToken } = require('../../utils/auth');

router.get('/testConnection', (req, res) => {
  res.json({ message: "success" })
})

// put authMiddleware anywhere we need to send a token for verification of user
router.post('/signup', ({ body }, res) => {
  try {

    User.create(body)
      .then(data => {
        if (!data) {
          return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(data);
        res.json({ token, data });
      })
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
})

router.post('/login', async ({ body }, res) => {
  try {

    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] })
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }
    const correctPw = await user.isCorrectPassword(body.password);
    console.log(correctPw)
    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
})

// save an itinerary to a user's 'saved_itinerary' field by adding it to the set (to prevent itinerary)
// user comes from 'req.user' created in the auth middleware function
router.post('/createItinerary', authMiddleware, async ({ user, body }, res) => {
  console.log(user)
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { saved_itinerary: body } },
      { new: true, runValidators: true }
    );
    return res.json(updatedUser);
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
})

// route that return the saved itineraries from a user 
router.get('/savedItinerary', authMiddleware, async ({ user }, res) => {
  try {
    const userItinerary = await User.findOne({ _id: user._id })
    const { saved_itinerary } = userItinerary
    // const token = jwt.sign({ saved_itinerary }, process.env.TOKEN_SECRET, { expiresIn: '2h' })
    res.json({ saved_itinerary })
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
})

// route used to buy an itinerary. Itinerary '_id' must come in the body.
router.put('/purchaseItinerary', authMiddleware, async ({ user, body }, res) => {
  // router put purchase logic
  try {
    const userClient = await User.findOne({ _id: user._id })
    const purchasedItinerary = await Itinerary.findOne({ _id: body._id })

    if (!userClient) {
      return res.status(400).json({ message: "User not found" })
    }
    if (!purchasedItinerary) {
      return res.status(400).json({ message: "Itinerary not found" })
    }

    let finalPoints = userClient.points - purchasedItinerary.price
    if (finalPoints >= 0) {
      // substract point from user
      // add itinerary to user saved_itinerary
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { points: finalPoints }, $addToSet: { saved_itinerary: purchasedItinerary } }
      );
      // add user _id to itinerary purchaser_ids
      await Itinerary.findOneAndUpdate(
        { _id: body._id },
        { $addToSet: { purchaser_ids: user._id } }
      )
    } else {
      return res.json({ message: "not enough points" })
    }
    res.json({ message: "successful transaction" })
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }

})

router.put('/addPoints', authMiddleware, ({ user, body }, res) => {
  try {
    const userUpdated = await User.findOneAndUpdate(
      { _id: user._id },
      {$add: { points: { 5 } }})
  }
})



// router.route('/signup').post(createUser)
//.put(authMiddleware, saveItinerary);

// router.route('/login').post(login);

// router.route('/me').get(authMiddleware, getSingleUser);

// router.route('/itineraries/:itineraryId').delete(authMiddleware, deleteItinerary);

module.exports = router;
