const express = require('express');
const clova = require('../clova');
const bot = require('../bot');
const api = require('../api');
const router = express.Router();

router.post(`/clova`, clova);
router.post(`/webhook`, bot);
router.post(`/api`, api);
module.exports = router;
