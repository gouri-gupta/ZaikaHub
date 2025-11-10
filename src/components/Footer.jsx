import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      {/* --- Main Footer Content --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
        
        {/* --- Logo Section --- */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex gap-1 items-center">
            <h1 className="font-sans text-3xl font-bold text-red-600">Zaika</h1>
            <h1 className="font-sans text-3xl font-bold text-yellow-400">Hub</h1>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Bringing authentic Indian flavors from your favorite Restaurants and HomeChefs — right to your doorstep.
          </p>
        </div>

        {/* --- Contact Info --- */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
          <p>📞 +91 9876543210</p>
          <p>✉️ support@zaikahub.com</p>
          <p>📍 Amravati, Maharashtra, India</p>
        </div>

        {/* --- Social Media Links --- */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex gap-5 text-2xl">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Zaika Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
