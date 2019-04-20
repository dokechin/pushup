const express = require('express');
const clova = require('../clova');
const bot = require('../bot');
const router = express.Router();

router.post(`/clova`, clova);
router.post(`/webhook`, bot);
module.exports = router;
