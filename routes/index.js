const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send(`Server start in port ${port}`);
});

router.get('/dashboard', (req, res)=>{
    res.send(`Server start in port ${port}`);
});

module.exports = router;