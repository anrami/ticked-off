'use client';

import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link href="/" className="logo">
                    TickedOff☑
                </Link>
            </div>
            
            <div className="navbar-right">
                <Link 
                    href="/about" 
                    className="px-4 py-2 hover:text-gray-600 transition-colors"
                >
                    How it works
                </Link>
                <button 
                    className="ml-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Login
                </button>
            </div>
        </nav>
    );
}