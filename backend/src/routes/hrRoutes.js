const express = require('express');

const { getAllCourses, getCourseById, enrollCourse } = require('../controllers/hrController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/:id/enroll', protect, enrollCourse);

module.exports = router;
