const { Router } = require('express');
const router = Router();
const path = require('path');
const filePath = path.resolve(__dirname, '../../public/index.html');

router.get("/", (req, res) => {
    res.sendFile(filePath);
});

module.exports = router;