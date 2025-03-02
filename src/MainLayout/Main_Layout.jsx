import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header';

export default function Main_Layout() {
    return (
        <div className=" max-w-7xl mx-auto font-poppins">
            <Header />
            <main className="pt-20 px-2 md:px-0">
                <Outlet />
            </main>
        </div>
    );
}
