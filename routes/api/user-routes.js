const router = require('express').Router();
const { User, Itinerary } = require('../../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();

// import middleware
const { authMiddleware, signToken } = require('../../utils/auth');
const auth = require('../../utils/auth');

router.get('/testConnection', (req, res) => {
  res.json({ message: "success" })
})

router.get('/', (req, res) => {
  try {

    User.findAll({})
      .then(dbUser => {
        res.json(dbUser)
      })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.get('/itinerary', async (req, res) => {
  try {
    console.log("fine")
    const itineraries = await Itinerary.find({})
    // last 8 itinerary
    console.log(itineraries)
    res.json(itineraries)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/searchCity', ({ body }, res) => {
    Itinerary.find({days:{ $elemMatch:{city : body.city}}}).collation({locale: 'en', strength: 2})
    .then(matchItinerary => {
      console.log(matchItinerary)
      res.json(matchItinerary)
    }).catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
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
    // res.redirect('/api/ProfilePage')
    res.json({ token });
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
})

// save an itinerary to a user's 'saved_itinerary' field by adding it to the set (to prevent itinerary)
// user comes from 'req.user' created in the auth middleware function
router.post('/createItinerary', authMiddleware, async ({ user, body }, res) => {
  try {
    console.log(body)
    const newItinerary = await Itinerary.create(body)
    console.log(newItinerary)
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { saved_itinerary: newItinerary } },
      { new: true, runValidators: true }
    );
    return res.json({ newItinerary, updatedUser });
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

router.post("/points", authMiddleware, async ({ user }, res) => {
  console.log("oogway")
  try {
    const currentPoints = await User.findOne({ _id: user._id})
    const{ points } = currentPoints 
    res.json({points})
  } catch (err) {
    return res.status(400).json(err)
  }
})

router.post('/purchased', authMiddleware, async ({ user }, res) => {
  console.log("oog")
  try {
    console.log("here")
    const itineraries = await User.findOne({ _id: user._id })
    const { purchased_itinerary, saved_itinerary } = itineraries
    // const token = jwt.sign({ saved_itinerary }, process.env.TOKEN_SECRET, { expiresIn: '2h' })
    console.log(itineraries)
    res.json({ purchased_itinerary, saved_itinerary })
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
})

// route used to buy an itinerary. Itinerary '_id' must come in the body.
router.put('/purchaseItinerary', authMiddleware, async ({ user, body }, res) => {
  // router put purchase logic
  console.log("here")
  try {
    const userClient = await User.findOne({ _id: user._id })
    const purchasedItinerary = await Itinerary.findOne({ _id: body._id})
    console.log("client and itin", userClient, purchasedItinerary)
    

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
        { $set: { points: finalPoints }, $addToSet: { purchased_itinerary: purchasedItinerary } }
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

router.put('/addpoints', authMiddleware, async ({user}, res) => {
  try {
    const currentUser = await User.findOne({ _id: user._id })
    console.log("client", currentUser)
    if (!currentUser) {
      return res.status(400).json({ message: "User not found" })
    }
    let newPoints = currentUser.points +=10
    await User.findOneAndUpdate(
      {_id: user._id},    
      { $set: { points: newPoints }}
    )
    res.json({message: "points added"})
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

router.put('/rateItinerary', authMiddleware, async ({ body }, res) => {
  try {
    const ratingItinerary = await Itinerary.findOne({ _id: body._id })
    if (!ratingItinerary) {
      return res.status(400).json({ message: "Itinerary not found" })
    }
    await Itinerary.findOneAndUpdate(
      { _id: body._id },
      { $addToSet: { ratings: body.rating } }
    )
    res.json({ message: "Input submitted" })
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

// router.get('/searchCity', ({ body }, res) => {
//   try {
//     Itinerary.find({ days: { $elemMatch: { city: body.city } } })
//       .then(matchItinerary => {
//         res.json(matchItinerary)
//       })
//   } catch (err) {
//     console.log(err)
//     return res.status(400).json(err)
//   }
// })

// router.put('/addPoints', authMiddleware, ({ user, body }, res) => {
//   try {
//     const userUpdated = await User.findOneAndUpdate(
//       { _id: user._id },
//       {$add: { points:  5  }})
//     if(!userUpdated){
//       return res.status(400).json({ message: "Something went wrong" })
//     }
//     res.json({message: "successfuly added points"})
//   } catch(err){
//     return res.status(400).json(err);
//   }
// })

// router.route('/signup').post(createUser)
//.put(authMiddleware, saveItinerary);

// router.route('/login').post(login);

// router.route('/me').get(authMiddleware, getSingleUser);

// router.route('/itineraries/:itineraryId').delete(authMiddleware, deleteItinerary);

module.exports = router;
