import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-sm"></div>
              </div>
              <span className="text-xl font-bold">REALTY</span>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>Realty Ltd.</p>
              <p>123 Main Street</p>
              <p>London, UK SW1A 1AA</p>
              <p>United Kingdom</p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white">
                About us
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Blog
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Services
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>

          {/* Real Estate Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Real estate</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white">
                Featured
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Buy
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Rent
              </a>
              <a href="#" className="block text-gray-400 hover:text-white">
                Sell
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Follow us</h3>
            <div className="flex space-x-4 mb-6">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>

            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-white text-black hover:bg-gray-200">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Realty. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of use
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}