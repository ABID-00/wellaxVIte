import React, { useState } from "react";
import { Building, ChevronDown, User } from "lucide-react";

const Navbar = ({ onNavigate, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-b from-black/70 via-gray-900/60 to-transparent border-b border-gray-800">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-xl font-semibold text-white hover:text-indigo-300 transition"
        >
          <Building className="w-6 h-6 text-indigo-400" />
          Wellax Reality
        </button>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-300 hover:text-indigo-400 transition"
          >
            <div className="w-6 h-0.5 bg-gray-400 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-400 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-400"></div>
          </button>
        </div>

        <ul
          className={`${isOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 bg-gray-900/95 md:bg-transparent p-6 md:p-0 gap-6 md:items-center transition-all duration-400 ease-in-out shadow-lg md:shadow-none`}
        >
          <li>
            <button
              onClick={() => {
                onNavigate("home");
                setIsOpen(false);
              }}
              className="text-gray-300 hover:text-indigo-300 font-medium"
            >
              Home
            </button>
          </li>
          {/* <li>
            <button
              onClick={() => onNavigate("story")}
              className="text-gray-300 hover:text-indigo-300"
            >
              Our Story
            </button>
          </li> */}


          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-300 hover:text-indigo-300"
            >
              Our Projects
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fadeIn min-w-[200px]">
                <li>
                  <button
                    onClick={() => {
                      onNavigate("property", { name: "wellax" });
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-indigo-700/30 text-gray-200"
                  >
                    Wellax
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate("property", { name: "Suncity Pride" });
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-indigo-700/30 text-gray-200"
                  >
                    Suncity Pride
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onNavigate("property", { name: "Silver Heights" });
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-indigo-700/30 text-gray-200"
                  >
                    Silver Heights
                  </button>
                </li>
              </ul>
            )}
          </li>

          
           <li>
            <button
              onClick={() => {
                onNavigate("enquiries");
                setIsOpen(false);
              }}
              className="text-gray-300 hover:text-indigo-300 font-medium"
            >
              All Enquiries
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onNavigate("enquiry-form");
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 shadow-md transition"
            >
              Enquire
            </button>
          </li>

          <li>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-200">Welcome, {user.name}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="px-2.5 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onNavigate("auth");
                  setIsOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105 shadow-sm transition"
              >
                <User className="w-3.5 h-3.5" /> Login / Signup
              </button>

            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
