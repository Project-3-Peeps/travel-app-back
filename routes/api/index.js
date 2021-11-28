const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

router.get('/testConnection', (req, res) => {
    res.json({ message: "success" })
})

module.exports = router;
