import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Restaurants from './pages/Restaurants'
import Homechefs from './pages/Homechefs'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Menu from './pages/Menu'
import CartProvider from './context/CartProvider'
import { Toaster } from 'react-hot-toast'
import Signup from './pages/Signup'
import UserProvider from './context/UserProvider'
import Notfound from './pages/Notfound'

import './global.css'

/*
CartProvider wraps your entire app,and Toaster is a global listener that just needs to exist once anywhere in the React component tree above where toast.*() is called.
*/
const App = () => {
    return (
        <>
            <UserProvider>
                <CartProvider>
                    <Toaster />
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/restaurants' element={<Restaurants />}></Route>
                            <Route path="/restaurants/:id/menu" element={<Menu />} />
                            <Route path='/homechefs' element={<Homechefs />}></Route>
                            <Route path="/homechefs/:id/menu" element={<Menu />} />
                            <Route path='/cart' element={<Cart />}></Route>
                            <Route path='/orders' element={<Orders />}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route path='/signup' element={<Signup />}></Route>
                            <Route path='*' element={<Notfound />}></Route>
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </UserProvider>
        </>
    )
}

export default App

//npx json-server --watch backend/db.json --port 4000


/*
All the jsons file which you see in backend are exported from mongodb.I create this "ZaikaHub" database by myself as a part of mini project
Now I have extended it in React 
Later when i complete Node and Express (probably by end of this month) I will extend the same to backend by using API requests and connecting mongoose and all
 */