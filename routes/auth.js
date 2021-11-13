const router = require('express').Router();
const authController = require('../controllers/authcontrollers');

// router
router.post('/register',authController.registration);
router.post('/login',authController.logIn);

module.exports = router;