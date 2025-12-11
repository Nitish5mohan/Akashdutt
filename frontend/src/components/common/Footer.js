import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Akashdutt</h3>
                        <p className="text-gray-400 text-sm">
                            Innovating Tomorrow's Drones. Leading the future of drone technology with AI, ML, and IoT solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/rnd" className="text-gray-400 hover:text-white transition">R&D</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-white transition">Shop</Link></li>
                            <li><Link href="/daas" className="text-gray-400 hover:text-white transition">DaaS</Link></li>
                            <li><Link href="/hr" className="text-gray-400 hover:text-white transition">Training</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                            <li><Link href="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaLinkedin /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaGithub /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaYoutube /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; 2024 Akashdutt. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
