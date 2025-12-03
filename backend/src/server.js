const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const productRoutes = require('./routes/productRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const rndRoutes = require('./routes/rndRoutes');
const hrRoutes = require('./routes/hrRoutes');
const authRoutes = require('./routes/authRoutes');

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rnd', rndRoutes);
app.use('/api/courses', hrRoutes);
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
    res.json({
        message: 'Antigravity Backend API Running',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            bookings: '/api/bookings',
            rnd: '/api/rnd',
            courses: '/api/courses'
        }
    });
});

// Socket.io Connection for Real-time DaaS
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Broadcast available drones
    socket.on('checkAvailability', (data) => {
        // Logic to check drone availability
        socket.emit('availabilityUpdate', { available: true });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
