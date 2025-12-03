import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FaMicroscope, FaRobot, FaNetworkWired } from 'react-icons/fa';

export default function RnD() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        droneType: '',
        purpose: '',
        budget: '',
        timeline: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/rnd/inquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                alert('✅ Thank you! Your inquiry has been submitted successfully.');
                setFormData({
                    name: '', company: '', email: '', droneType: '',
                    purpose: '', budget: '', timeline: '', description: ''
                });
            } else {
                alert('❌ Error submitting inquiry. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Network error. Please check your connection.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">R&D & Custom Drone Development</h1>
                    <p className="text-xl text-gray-300">
                        AI, ML, and IoT-Powered Solutions for Enterprise & Government
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaMicroscope className="text-5xl text-purple-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Innovation</h3>
                        <p className="text-gray-600">Cutting-edge research and development</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaRobot className="text-5xl text-purple-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">AI & ML</h3>
                        <p className="text-gray-600">Intelligent autonomous systems</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaNetworkWired className="text-5xl text-purple-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">IoT Integration</h3>
                        <p className="text-gray-600">Connected drone ecosystems</p>
                    </div>
                </div>

                {/* Inquiry Form */}
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Request Custom Solution</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Your Name *"
                                required
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                placeholder="Company Name *"
                                required
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email *"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                        <select
                            name="droneType"
                            value={formData.droneType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Drone Type *</option>
                            <option value="surveillance">Surveillance</option>
                            <option value="delivery">Delivery</option>
                            <option value="agriculture">Agriculture</option>
                            <option value="inspection">Inspection</option>
                            <option value="other">Other</option>
                        </select>
                        <textarea
                            name="description"
                            value={formData.description}
                            placeholder="Project Description *"
                            required
                            rows="4"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
