import React from 'react'
import logo from './logo.png';
import { FaAngleDoubleDown } from "react-icons/fa";

const Heropage = () => {

    const handleScrollDown = () => {
        const section = document.getElementById("offer-section");
        section?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className='min-h-screen bg-[rgb(248,241,230)] flex flex-col md:flex-row'>
            <section className='w-full md:w-3/4 flex flex-col justify-center items-center gap-5 p-4'>
                <h1 className='font-bold font-sans text-red-600 text-5xl sm:text-6xl md:text-8xl text-center md:text-left'>
                    Bharat ka apna Zaika!
                </h1>
                <h1 className='italic font-bold font-sans text-yellow-400 text-xl sm:text-2xl md:text-3xl text-center md:text-left'>
                    Discover flavors from Restaurants & HomeChefs near you
                </h1>
                <div
                    className='scroll cursor-pointer mt-10 text-xl sm:text-2xl flex flex-row items-center justify-center md:justify-start'
                    onClick={handleScrollDown}
                >
                    Scroll Down
                    <span><FaAngleDoubleDown /></span>
                </div>
            </section>
            <section className='w-full md:w-1/4 flex flex-col justify-center items-center p-4'>
                <img src={logo} alt="" className='w-48 sm:w-60 md:w-full h-auto' />
            </section>
        </main>
    )
}

export default Heropage
