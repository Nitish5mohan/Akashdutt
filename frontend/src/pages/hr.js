import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FaGraduationCap, FaCertificate, FaUsers } from 'react-icons/fa';

export default function HR() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/courses`);
            const data = await response.json();

            if (data.success) {
                setCourses(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/api/courses/${courseId}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.success) {
                alert('✅ Successfully enrolled in course!');
                fetchCourses();
            } else {
                alert('❌ ' + (data.error || 'Enrollment failed'));
            }
        } catch (error) {
            console.error('Error enrolling:', error);
            alert('❌ Network error. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <section className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Drone Training & Certification</h1>
                    <p className="text-xl text-gray-300">
                        Professional Courses to Launch Your Drone Career
                    </p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16 flex-1">
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaGraduationCap className="text-5xl text-amber-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Expert Instructors</h3>
                        <p className="text-gray-600 mt-2">Learn from industry professionals</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaCertificate className="text-5xl text-amber-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Certification</h3>
                        <p className="text-gray-600 mt-2">Recognized industry credentials</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <FaUsers className="text-5xl text-amber-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold">Hands-on Training</h3>
                        <p className="text-gray-600 mt-2">Practical flight experience</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="text-2xl text-gray-600">Loading courses...</div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {courses.map((course) => (
                            <div key={course._id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-semibold text-amber-600 uppercase">{course.level}</span>
                                        <h3 className="text-2xl font-bold mt-1">{course.title}</h3>
                                    </div>
                                    <span className="text-2xl font-bold text-amber-600">${course.price}</span>
                                </div>
                                <p className="text-gray-600 mb-4">{course.description}</p>
                                <div className="text-sm text-gray-500 mb-4">
                                    <p>Duration: {course.duration}</p>
                                    <p>Instructor: {course.instructor}</p>
                                    <p>Enrolled: {course.enrolled}/{course.capacity}</p>
                                </div>

                                {user ? (
                                    <button
                                        onClick={() => handleEnroll(course._id)}
                                        disabled={course.enrolled >= course.capacity}
                                        className={`w-full py-2 rounded-lg font-semibold transition ${course.enrolled >= course.capacity
                                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                                : 'bg-amber-600 hover:bg-amber-700 text-white'
                                            }`}
                                    >
                                        {course.enrolled >= course.capacity ? 'Course Full' : 'Enroll Now'}
                                    </button>
                                ) : (
                                    <Link href="/login" className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-center py-2 rounded-lg font-semibold transition">
                                        Login to Enroll
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
