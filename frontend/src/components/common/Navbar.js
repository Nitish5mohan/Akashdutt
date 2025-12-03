import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Antigravity
                </Link>
                <div className="space-x-6 flex items-center">
                    <Link href="/rnd" className="hover:text-purple-400 transition">R&D</Link>
                    <Link href="/products" className="hover:text-blue-400 transition">Products</Link>
                    <Link href="/daas" className="hover:text-green-400 transition">DaaS</Link>
                    <Link href="/hr" className="hover:text-amber-400 transition">Training</Link>

                    {user ? (
                        <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-gray-700">
                            <span className="text-sm text-gray-300">Hi, {user.name}</span>
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition ml-4">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
