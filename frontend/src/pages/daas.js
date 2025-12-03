import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FaHelicopter, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function DaaS() {
    const { user } = useAuth();
    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        droneType: '',
        pilot: false,
        location: ''
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setBookingData({ ...bookingData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            // Get token from localStorage for this specific request if needed, 
            // but api.js interceptor should handle it if we used that. 
            // Since we are using fetch here, we need to manually add the header.
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });

            const data = await response.json();

            if (data.success) {
                alert(`✅ Booking confirmed! Total cost: $${data.data.totalCost}`);
                setBookingData({
                    date: '', time: '', droneType: '', pilot: false, location: ''
                });
            } else {
                alert('❌ ' + (data.error || 'Booking failed'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Network error. Please check your connection.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <section className="bg-gradient-to-r from-green-900 to-teal-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Drone-as-a-Service</h1>
                    <p className="text-xl text-gray-300">
                        Rent Drones On-Demand with Optional Pilot Assistance
                    </p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16 flex-1">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaHelicopter className="text-5xl text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Instant Availability</h3>
                            <p className="text-gray-600 mt-2">Book drones in real-time</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaClock className="text-5xl text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Hourly Rates</h3>
                            <p className="text-gray-600 mt-2">Flexible rental periods</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaMapMarkerAlt className="text-5xl text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Nationwide Service</h3>
                            <p className="text-gray-600 mt-2">Available across locations</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-3xl font-bold mb-6">Book a Drone</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    name="date"
                                    value={bookingData.date}
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="time"
                                    name="time"
                                    value={bookingData.time}
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <select
                                name="droneType"
                                value={bookingData.droneType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Drone Type *</option>
                                <option value="photography">Photography Drone</option>
                                <option value="inspection">Inspection Drone</option>
                                <option value="delivery">Delivery Drone</option>
                                <option value="surveillance">Surveillance Drone</option>
                            </select>
                            <input
                                type="text"
                                name="location"
                                value={bookingData.location}
                                placeholder="Service Location *"
                                required
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="pilot"
                                    checked={bookingData.pilot}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-green-600"
                                />
                                <span>Add Certified Pilot (+$50/hr)</span>
                            </label>

                            {user ? (
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                                >
                                    Book Now
                                </button>
                            ) : (
                                <div className="text-center p-4 bg-gray-100 rounded-lg">
                                    <p className="text-gray-600 mb-2">Please login to book a drone</p>
                                    <Link href="/login" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                                        Login to Book
                                    </Link>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
