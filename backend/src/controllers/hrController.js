const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isActive: true });

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Public
exports.enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }

        if (course.enrolled >= course.capacity) {
            return res.status(400).json({
                success: false,
                error: 'Course is full'
            });
        }

        course.enrolled += 1;
        await course.save();

        res.status(200).json({
            success: true,
            message: 'Successfully enrolled',
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
