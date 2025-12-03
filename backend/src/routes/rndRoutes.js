const express = require('express');
const router = express.Router();
const { submitInquiry, getAllInquiries, updateInquiryStatus } = require('../controllers/rndController');

router.post('/inquiry', submitInquiry);
router.get('/inquiries', getAllInquiries);
router.put('/inquiry/:id', updateInquiryStatus);

module.exports = router;
