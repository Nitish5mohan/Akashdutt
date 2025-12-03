const Inquiry = require('../models/Inquiry');

// @desc    Submit R&D Inquiry
// @route   POST /api/rnd/inquiry
// @access  Public
exports.submitInquiry = async (req, res) => {
    try {
        const { name, company, email, droneType, purpose, budget, timeline, description } = req.body;

        const inquiry = await Inquiry.create({
            name,
            company,
            email,
            droneType,
            purpose,
            budget,
            timeline,
            description
        });

        res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully',
            data: inquiry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all inquiries
// @route   GET /api/rnd/inquiries
// @access  Private (Admin)
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: inquiries.length,
            data: inquiries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Update inquiry status
// @route   PUT /api/rnd/inquiry/:id
// @access  Private (Admin)
exports.updateInquiryStatus = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                error: 'Inquiry not found'
            });
        }

        res.status(200).json({
            success: true,
            data: inquiry
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
