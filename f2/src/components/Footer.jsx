import React from "react";
import { Instagram, Facebook, Linkedin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-black/70 via-gray-900/80 to-transparent text-gray-300 py-10 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-semibold mb-3 text-white">Follow Us</p>
          <div className="flex gap-4">
            <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer transition" src="https://www.instagram.com/realestate?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" />
            <Facebook className="w-5 h-5 hover:text-blue-500 cursor-pointer transition" />
            <Linkedin className="w-5 h-5 hover:text-blue-400 cursor-pointer transition" />
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3 text-white">Explore</p>
          <div className="flex flex-col gap-2">
            <button className="hover:text-indigo-400 text-left">Privacy</button>
            <button className="hover:text-indigo-400 text-left">Terms</button>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3 text-white">Contact</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-4 h-4 text-indigo-400" /> +91 8850 612 288
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} Wellax Reality
      </div>
    </footer>
  );
};

export default Footer;
