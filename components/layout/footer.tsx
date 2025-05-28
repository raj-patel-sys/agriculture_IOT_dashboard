export default function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-green-500 text-lg font-semibold mb-4">AgroCense</h3>
            <p className="text-sm">
              Advanced IoT solutions for modern agriculture. Monitoring and
              optimizing your crops with cutting-edge technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-green-500 text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Our Technology</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-green-500 text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-sm space-y-2">
              <p>123 Agriculture Way</p>
              <p>Crop City, CS 12345</p>
              <p>Email: info@agrocense.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AgroCense. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}