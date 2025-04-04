import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Footer from '../Components/Footer/Footer';

export default function Main_Layout() {
    return (
        <div className="min-h-screen flex flex-col max-w-7xl mx-auto font-poppins">
            <Header />
            <main className="flex-grow pt-20 px-2 md:px-0">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
