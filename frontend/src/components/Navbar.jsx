import { Button } from "@/components/ui/button"
import Language from "./Language"

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold text-black">REALTY</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-black">
            Featured
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Buy
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Rent
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Sell
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

        <Button variant="outline" className="border-gray-300 bg-transparent">
          Register/Login
        </Button>
      </div>
    </header>
  )
}
