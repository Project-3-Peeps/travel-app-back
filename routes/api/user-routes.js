const router = require('express').Router();
const { User } = require('../../models')
const {
  createUser,
  getSingleUser,
  saveItinerary,
  deleteItinerary,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware, signToken } = require('../../utils/auth');

router.get('/testConnection', (req, res) => {
  res.json({ message: "success" })
})

router.get('/', (req, res) => {
  User.findAll({})
  .then(dbUser => {
    res.json(dbUser)
  })
  .catch(err)
})

// put authMiddleware anywhere we need to send a token for verification of user
router.post('/signup', ({ body }, res) => {
  User.create(body)
    .then(data => {
      if (!data) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(data);
      res.json({ token, data });
    })
})

router.post('/login', ({ body }, res) => {
  User.findOne({ $or: [{ username: body.username }, { email: body.email }] })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }
      const correctPw = user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    })
})

// router.route('/signup').post(createUser)
//.put(authMiddleware, saveItinerary);

// router.route('/login').post(login);

// router.route('/me').get(authMiddleware, getSingleUser);

// router.route('/itineraries/:itineraryId').delete(authMiddleware, deleteItinerary);

module.exports = router;
