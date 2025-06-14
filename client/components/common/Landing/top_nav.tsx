"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const TopNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
     {
      title: 'Home',
      url: '/'
    },
    {
      title: 'Features',
      url: '/features'
    },
    {
      title: 'Pricing',
      url: '/pricing'
    },
     {
      title: 'About',
      url: '/about'
    },
     {
      title: 'Contact',
      url: '/contact'
    }
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo & Nav links */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">ESchool</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Buttons & Mobile menu toggle */}
          <div className="flex items-center space-x-4">
            <Button className="text-gray-700 hover:text-blue-600 font-medium" variant='ghost'>
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium">
              Get Started
            </Button>
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-6 space-y-4 mt-16">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.url}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 font-medium transition duration-100 rounded-sm hover:text-blue-600 w-full p-2 hover:bg-blue-500/20 "
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default TopNavBar;
