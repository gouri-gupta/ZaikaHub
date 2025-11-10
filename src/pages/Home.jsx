import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Heropage from '../components/Heropage'
import Offer from '../components/Offer'
import Footer from '../components/Footer'

{/*Here in Home page you have to make Navbar and Heropage responsive Rest 2 pages of Offer and Footer are already responsive  */}
const Home = () => {
    return (
        <>
            {/*<h1>Home</h1>*/}
            <Navbar></Navbar>
            <Heropage></Heropage>
            <Offer></Offer>
            <Footer></Footer>
            <Outlet></Outlet>
        </>
    )
}

export default Home
