const express = require('express');
const router = express.Router();

const Turn = require('../models/turn');

router.get('/', async (req, res) => {
    
    const turns = await Turn.find();
    console.log(turns);
    res.json(turns);

});

router.post('/', async (req, res) => {

    const { number, hour } = req.body;
    const turn = new Turn({ number, hour });
    await turn.save();
    res.json({status: 'Turn Saved'});

});

module.exports = router;