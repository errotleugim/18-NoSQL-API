const router = require('express').Router();
const courseRoutes = require('./courseRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;
