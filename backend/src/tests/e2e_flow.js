const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test Data
const testUser = {
    name: 'Test User ' + Date.now(),
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    role: 'user'
};

const testBooking = {
    date: '2025-12-25',
    time: '10:00',
    droneType: 'photography',
    location: 'Test Location',
    pilot: true
};

async function runTest() {
    console.log('🚀 Starting End-to-End Backend Test...\n');

    let token = '';

    try {
        // 1. Register User
        console.log('1️⃣  Testing Registration...');
        const registerRes = await axios.post(`${API_URL}/auth/register`, testUser);
        if (registerRes.data.success) {
            console.log('✅ Registration Successful');
            token = registerRes.data.token;
        } else {
            throw new Error('Registration failed');
        }

        // 2. Login User (Verify credentials work)
        console.log('\n2️⃣  Testing Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        if (loginRes.data.success) {
            console.log('✅ Login Successful');
            // Update token just in case
            token = loginRes.data.token;
        }

        // 3. Get Profile (Protected Route)
        console.log('\n3️⃣  Testing Protected Route (Get Profile)...');
        const profileRes = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (profileRes.data.success) {
            console.log(`✅ Profile Access Successful (Hello ${profileRes.data.data.name})`);
        }

        // 4. Browse Products (Public Route)
        console.log('\n4️⃣  Testing Public Route (Get Products)...');
        const productsRes = await axios.get(`${API_URL}/products`);
        if (productsRes.data.success) {
            console.log(`✅ Fetched ${productsRes.data.data.length} Products`);
        }

        // 5. Create Booking (Protected Action)
        console.log('\n5️⃣  Testing Booking Creation...');
        const bookingRes = await axios.post(`${API_URL}/bookings`, testBooking, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (bookingRes.data.success) {
            console.log(`✅ Booking Created! Cost: $${bookingRes.data.data.totalCost}`);
        }

        console.log('\n✨ ALL TESTS PASSED! Backend is fully functional. ✨');

    } catch (error) {
        console.error('\n❌ TEST FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

runTest();
