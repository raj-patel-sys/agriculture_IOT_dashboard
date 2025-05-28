"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="px-20">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold text-white">AgroCense</span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/"
                  className={`transition-colors ${
                    isActive("/")
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-400"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/sensors"
                  className={`transition-colors ${
                    isActive("/sensors")
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-400"
                  }`}
                >
                  Sensors
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className={`transition-colors ${
                    isActive("/analytics")
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-400"
                  }`}
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={`transition-colors ${
                    isActive("/settings")
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-400"
                  }`}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className="md:hidden text-gray-300 hover:text-green-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md ${
                isActive("/")
                  ? "text-green-400 bg-green-900/30"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/sensors"
              className={`block px-3 py-2 rounded-md ${
                isActive("/sensors")
                  ? "text-green-400 bg-green-900/30"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Sensors
            </Link>
            <Link
              href="/analytics"
              className={`block px-3 py-2 rounded-md ${
                isActive("/analytics")
                  ? "text-green-400 bg-green-900/30"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Analytics
            </Link>
            <Link
              href="/settings"
              className={`block px-3 py-2 rounded-md ${
                isActive("/settings")
                  ? "text-green-400 bg-green-900/30"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}