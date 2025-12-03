import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FaShoppingCart } from 'react-icons/fa';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/products`);
            const data = await response.json();

            if (data.success) {
                setProducts(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <section className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Shop Our Tech</h1>
                    <p className="text-xl text-gray-300">
                        Enterprise Drones, Consumer Models & Premium Components
                    </p>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16 flex-1">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="text-2xl text-gray-600">Loading products...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center">
                                    <FaShoppingCart className="text-6xl text-white" />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-semibold text-blue-600 uppercase">{product.category}</span>
                                    <h3 className="text-xl font-bold mt-2 mb-2">{product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                                    <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toLocaleString()}</p>
                                    <div className="text-sm text-gray-500 mb-4">
                                        <p>Stock: {product.stock} units</p>
                                        {product.specs && (
                                            <p className="text-xs mt-1">Range: {product.specs.range} | Flight: {product.specs.flightTime}</p>
                                        )}
                                    </div>
                                    <Link href={`/products/${product._id}`} className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-semibold transition">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
