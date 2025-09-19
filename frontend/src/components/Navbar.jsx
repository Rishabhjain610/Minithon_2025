import { Button } from "@/components/ui/button"
import Language from "./Language"
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/Roomy.png" className="h-16 w-30" alt="" />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-black">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            About us
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Services
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Blog
          </a>
          <Language />
        </nav>

        <Link to="login">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            Register/Login
          </Button>
        </Link>       
      </div>
    </header>
  )
}
