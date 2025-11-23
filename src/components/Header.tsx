"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./atoms";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MyLogo
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        <Button 
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "ss" : "pp"}
        </Button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 px-6 py-4">
            <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
