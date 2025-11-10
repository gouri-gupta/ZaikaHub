import React from 'react'
import { FaUtensils ,FaUserTie, FaBiking, FaLeaf, FaGlobeAsia, FaBoxOpen } from "react-icons/fa";
import { TbClock24 } from "react-icons/tb";


const Offer = () => {
    return (
        <main id="offer-section" className='flex flex-col gap-2 bg-[rgb(248,241,230)] '> {/*border border-solid border-black */}
            <div className='flex text-6xl text-red-700 font-bold font-sans justify-center items-center mt-5 mb-5 '> {/*border border-solid border-blue-500 */}
                <h1 >What we offer</h1>
            </div>

            <div className='iconSection flex flex-wrap justify-center gap-6 mt-5 mb-5 mx-10'>
                <section className='flex flex-col w-[280px]  bg-white rounded-3xl shadow-md hover:scale-105 transition-transform duration-300'> {/*border border-solid border-amber-400  Like this add border to every card to check styling */}
                    <div className='flex justify-center text-4xl text-red-700 mt-5 mb-5'><FaUtensils ></FaUtensils></div>
                    <h3 className='text-center font-bold font-serif text-2xl mt-2 mb-2 mr-5 ml-5'>Restaurants Near You</h3>
                    <p className='text-center text-xl text-gray-500 mb-5 mr-5 ml-5'>Explore a wide range of cuisines from the best restaurants in your city</p>
                </section>

                <section className='flex flex-col w-[280px]  bg-white rounded-3xl shadow-md hover:scale-105 transition-transform duration-300'>
                    <div className='flex justify-center text-4xl text-red-700 mt-5 mb-5'><FaUserTie ></FaUserTie></div>
                    <h3 className='text-center font-bold font-serif text-2xl mt-2 mb-2 mr-5 ml-5'>HomeChefs</h3>
                    <p className='text-center text-xl text-gray-500 mb-5 mr-5 ml-5'>Authentic home-cooked meals prepared with love and care.</p>
                </section>

                <section className='flex flex-col w-[280px]  bg-white rounded-3xl shadow-md hover:scale-105 transition-transform duration-300'>
                    <div className='flex justify-center text-4xl text-red-700 mt-5 mb-5'><FaBiking ></FaBiking></div>
                    <h3 className='text-center font-bold font-serif text-2xl mt-2 mb-2 mr-5 ml-5'>Fast and Reliable Delivery</h3>
                    <p className='text-center text-xl text-gray-500 mb-5 mr-5 ml-5'>Hot and fresh food delivered quickly at your doorstep..</p>
                </section>

                <section className='flex flex-col w-[280px]  bg-white rounded-3xl shadow-md hover:scale-105 transition-transform duration-300'>
                    <div className='flex justify-center text-4xl text-red-700 mt-5 mb-5'><FaLeaf  ></FaLeaf></div>
                    <h3 className='text-center font-bold font-serif text-2xl mt-2 mb-2 mr-5 ml-5'>Pure Veg Options</h3>
                    <p className='text-center text-xl text-gray-500 mb-5 mr-5 ml-5'>Special curated menus for vegetarian food lovers.</p>
                </section>

                <section className='flex flex-col w-[280px]  bg-white rounded-3xl shadow-md hover:scale-105 transition-transform duration-300'>
                    <div className='flex justify-center text-4xl text-red-700 mt-5 mb-5'><FaGlobeAsia  ></FaGlobeAsia></div>
                    <h3 className='text-center font-bold font-serif text-2xl mt-2 mb-2 mr-5 ml-5'>Diverse cuisines</h3>
                    <p className='text-center text-xl text-gray-500 mb-5 mr-5 ml-5'>From local thalis to international cuisines — all in one place.</p>
                </section>

                <section className='flex flex-col w-[280px]  bg-white rounded-3xl shadow-md hover:scale-105 transition-transform duration-300'>
                    <div className='flex justify-center text-4xl text-red-700 mt-5 mb-5'><FaBoxOpen  ></FaBoxOpen></div>
                    <h3 className='text-center font-bold font-serif text-2xl mt-2 mb-2 mr-5 ml-5'>Hygiene & Safe Packaging</h3>
                    <p className='text-center text-xl text-gray-500 mb-5 mr-5 ml-5'>Packed with care, following hygiene and safety standards.</p>
                </section>

                <section className='flex flex-col w-[280px]  bg-white rounded-3xl shadow-md hover:scale-105 transition-transform duration-300'>
                    <div className='flex justify-center text-4xl text-red-700 mt-5 mb-5'><TbClock24  ></TbClock24></div>
                    <h3 className='text-center font-bold font-serif text-2xl mt-2 mb-2 mr-5 ml-5'>24/7 Availability</h3>
                    <p className='text-center text-xl text-gray-500 mb-5 mr-5 ml-5'>Order anytime, day or night — we are here to satisfy your cravings round the clock.</p>
                </section>

            </div>
        </main>
    )
}

export default Offer
