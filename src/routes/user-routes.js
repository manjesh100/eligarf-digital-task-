const express = require('express'); 
const authControllerObject = require('../controllers/authController');  
const router = express.Router();

router.post('/signup', authControllerObject.sinupUser);
router.post("/login" ,authControllerObject.loginUser)
 


module.exports = router;