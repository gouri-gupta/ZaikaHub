import { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  let d = useContext(UserContext)
  let { user, isLoggedIn, logoutUser } = d

  // Mobile menu toggle state
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="flex flex-col gap-2 ">
      {/* NAVBAR */}
      <div className="w-full flex flex-wrap justify-between items-center bg-[rgb(248,241,230)] p-3 px-6  mt-3">
        
        {/* LEFT: Logo */}
        <section className="logo flex flex-row items-center gap-1">
          <h1 className="font-sans text-3xl font-bold text-red-600">Zaika</h1>
          <h1 className="font-sans text-3xl font-bold text-yellow-400">Hub</h1>
        </section>

        {/* HAMBURGER ICON for mobile */}
        <button
          className="text-red-700 text-3xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* CENTER: Navigation Links */}
        <section
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row gap-6 mt-4 md:mt-0 md:items-center`}
        >
          <ul className="flex flex-col md:flex-row gap-5 md:gap-8 text-center">
            {["/", "/restaurants", "/homechefs", "/cart", "/orders"].map((path, i) => {
              const names = ["Home", "Restaurants", "Homechefs", "Cart", "Orders"]
              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    style={({ isActive }) => ({
                      color: isActive ? "red" : "black",
                      textDecoration: isActive ? "underline" : "none",
                      fontFamily: "sans-serif",
                      fontSize: isActive ? "18px" : "15px",
                      fontWeight: isActive ? "bold" : "normal",
                    })}
                    onClick={() => setIsOpen(false)} // close on link click
                  >
                    {names[i]}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </section>

        {/* RIGHT: Buttons */}
        <section className="flex flex-col md:flex-row items-center gap-2 mt-3 md:mt-0">
          {isLoggedIn ? (
            <button
              onClick={() => {
                logoutUser()
                setIsOpen(false)
              }}
              className="outline-green-700 outline-solid rounded-xl bg-green-400 text-white font-bold p-2 hover:bg-green-600"
            >
              <Link to="/">Logout</Link>
            </button>
          ) : (
            <>
              <button
                className="outline-2 outline-red-800 outline-offset-0 rounded-2xl font-bold text-red-700 p-2 cursor-pointer hover:bg-gray-100 hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                <Link to="/login">Login</Link>
              </button>
              <button
                className="outline-2 outline-red-800 outline-offset-0 rounded-2xl font-bold text-red-700 p-2 cursor-pointer hover:bg-gray-100 hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                <Link to="/signup">Signup</Link>
              </button>
            </>
          )}
        </section>
      </div>

      {/* MARQUEE */}
      <div className="marquee-wrapper bg-red-700 text-center py-1">
        <div className="marquee-text text-white font-bold whitespace-nowrap ">
          {user ? `Welcome to Zaika Hub ${user.name}` : "Welcome to Zaika Hub"}
        </div>
      </div>
    </main>
  )
}

export default Navbar
