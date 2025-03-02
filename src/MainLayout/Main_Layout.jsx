import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Shared/Sidebar/Sidebar'
import Footer from '../Shared/Footer/Footer'
import Header from '../Shared/Header/Header'

export default function Main_Layout() {
    return (
        <div className="lg:flex bg-gray-50  h-screen lg:overflow-hidden font-poppins">
            {/* Fixed Dashboard for large devices */}
            <div className="">
                <Sidebar />

            </div>
            <main className="flex-1  lg:overflow-y-auto">
                {/* Dashboard Navbar */}
                <div className=' lg:block hidden '>
                    <Header />
                </div>
                <div className='py-2 px-3 lg:mt-20 '>
                    {/* Outlet for rendering nested routes */}
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
