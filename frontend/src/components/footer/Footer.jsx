// src/components/Footer.jsx
import React from "react";
import { Facebook, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left Section: Logo + Copyright */}
        <div className="flex flex-col">
          <div className="text-lg font-semibold">
            Job <span className="text-blue-600">Portal</span>
          </div>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Job Portal. All rights reserved.
          </div>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
