const express = require('express')
const router = express.Router()
const HealthController = require('../controllers/HealthController')



router.get('/health', HealthController.checkHealth);


module.exports = router