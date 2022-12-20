const express = require('express');
const router = express.Router();

const Turn = require('../models/turn');

router.get('/', async (req, res) => {
    
    const turns = await Turn.find();
    console.log(turns);
    res.json(turns);

});

module.exports = router;