const express = require('express');
const router = express.Router();

/* /api/v1/chat */
router.get("/", (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "chat": []
        }
    });
});

router.post("/", (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "message": {
                "text": "Learn Node"
            }
        }
    });
});

module.exports = router;