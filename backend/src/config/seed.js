const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Course = require('../models/Course');

dotenv.config();

const products = [
    {
        name: "SkyMaster Pro X1",
        category: "Enterprise",
        price: 12999,
        description: "Professional enterprise drone with advanced AI capabilities",
        specs: { range: "10km", flightTime: "45min", camera: "4K 60fps" },
        images: ["/images/drone1.jpg"],
        stock: 15
    },
    {
        name: "AeroVision 4K",
        category: "Consumer",
        price: 1299,
        description: "Perfect for photography enthusiasts",
        specs: { range: "3km", flightTime: "25min", camera: "4K 30fps" },
        images: ["/images/drone2.jpg"],
        stock: 50
    },
    {
        name: "AgriDrone 500",
        category: "Enterprise",
        price: 8499,
        description: "Specialized for agricultural monitoring",
        specs: { range: "8km", flightTime: "40min", camera: "Multispectral" },
        images: ["/images/drone3.jpg"],
        stock: 10
    },
    {
        name: "Beginner Lite",
        category: "Consumer",
        price: 599,
        description: "Entry-level drone for beginners",
        specs: { range: "1km", flightTime: "15min", camera: "HD 30fps" },
        images: ["/images/drone4.jpg"],
        stock: 100
    }
];

const courses = [
    {
        title: "Drone Pilot Basics",
        level: "Beginner",
        duration: "4 weeks",
        price: 299,
        description: "Learn fundamental drone operations and safety protocols.",
        syllabus: ["Drone basics", "Safety regulations", "Basic flight", "Emergency procedures"],
        capacity: 30,
        enrolled: 12,
        instructor: "Capt. Rajesh Kumar",
        isActive: true
    },
    {
        title: "Advanced Flight Techniques",
        level: "Intermediate",
        duration: "6 weeks",
        price: 499,
        description: "Master complex maneuvers and enterprise applications.",
        syllabus: ["Advanced controls", "Professional filming", "Weather flying", "Mission planning"],
        capacity: 20,
        enrolled: 8,
        instructor: "Dr. Priya Sharma",
        isActive: true
    },
    {
        title: "Commercial Drone Certification",
        level: "Advanced",
        duration: "8 weeks",
        price: 799,
        description: "Achieve professional certification for commercial operations.",
        syllabus: ["Commercial regulations", "Business operations", "Advanced piloting", "Legal compliance"],
        capacity: 15,
        enrolled: 5,
        instructor: "Capt. Amit Patel",
        isActive: true
    },
    {
        title: "Drone Maintenance & Repair",
        level: "Professional",
        duration: "4 weeks",
        price: 599,
        description: "Comprehensive technical training for drone servicing.",
        syllabus: ["Hardware overview", "Diagnostics", "Repair techniques", "Preventive maintenance"],
        capacity: 25,
        enrolled: 10,
        instructor: "Eng. Suresh Reddy",
        isActive: true
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany();
        await Course.deleteMany();
        console.log('🗑️  Cleared existing data');

        // Insert sample data
        await Product.insertMany(products);
        await Course.insertMany(courses);

        console.log('✅ Sample data inserted successfully!');
        console.log(`📦 Products: ${products.length}`);
        console.log(`📚 Courses: ${courses.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedData();
