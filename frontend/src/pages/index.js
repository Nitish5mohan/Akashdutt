import React from 'react';
import Link from 'next/link';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FaMicroscope, FaShoppingCart, FaHelicopter, FaGraduationCap } from 'react-icons/fa';

export default function Home() {
    const verticals = [
        {
            icon: <FaMicroscope className="text-5xl mb-4 text-purple-500" />,
            title: "R&D",
            subtitle: "Custom Drone Solutions",
            description: "AI, ML, and IoT-powered drones for enterprise and government.",
            link: "/rnd",
            color: "purple"
        },
        {
            icon: <FaShoppingCart className="text-5xl mb-4 text-blue-500" />,
            title: "Buy Tech",
            subtitle: "Shop Drones & Parts",
            description: "Enterprise drones, consumer models, and premium components.",
            link: "/products",
            color: "blue"
        },
        {
            icon: <FaHelicopter className="text-5xl mb-4 text-green-500" />,
            title: "DaaS",
            subtitle: "Rent a Drone",
            description: "On-demand drone rental with certified pilot assistance.",
            link: "/daas",
            color: "green"
        },
        {
            icon: <FaGraduationCap className="text-5xl mb-4 text-amber-500" />,
            title: "Training",
            subtitle: "Become a Pilot",
            description: "Professional drone technology courses and certifications.",
            link: "/hr",
            color: "amber"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Welcome to <span className="text-blue-400">Akashdutt</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Innovating Tomorrow's Drones Today
                    </p>
                    <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                        From cutting-edge R&D to enterprise solutions, we're revolutionizing the drone industry with AI, ML, and IoT technology.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition">
                            Explore Products
                        </Link>
                        <Link href="/rnd" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition">
                            Our R&D
                        </Link>
                    </div>
                </div>
            </section>

            {/* Verticals Section */}
            <main className="container mx-auto px-4 py-16 flex-1">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Verticals</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our comprehensive drone solutions designed for every need
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {verticals.map((vertical, index) => (
                        <Link
                            key={index}
                            href={vertical.link}
                            className="group"
                        >
                            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border-t-4 border-transparent hover:border-blue-500">
                                <div className="flex flex-col items-center text-center">
                                    {vertical.icon}
                                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{vertical.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{vertical.subtitle}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{vertical.description}</p>
                                    <div className="mt-4 text-blue-500 font-semibold group-hover:text-blue-700">
                                        Learn More →
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Flight?</h2>
                    <p className="text-lg mb-8 text-blue-100">
                        Join the drone revolution with Akashdutt. Whether you need custom solutions or ready-to-fly drones, we've got you covered.
                    </p>
                    <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
                        Get Started
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
