import { FaBell, FaCog } from 'react-icons/fa'
import './styles/layout.css'

export function TopBar({className}){
    return (
  <div className={`topbar flex items-center px-4 py-2 shadow-md bg-white ${className ?? ""}`}>
    {/* Logo */}
    <div className="flex items-center gap-3">
      <img src="/logo-no-text.png" className="appLogoForMenu h-10 w-10" alt="Logo" />
      <p className="font-mono font-black text-green-800 text-2xl">FARMERS-GRID</p>
    </div>

    {/* Search bar */}
    <div className="flex-1 mx-6">
      {/* <input
        type="text"
        placeholder="Search products..."
        className="w-full max-w-md px-3 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      /> */}
    </div>

    {/* Right side actions */}
    <div className="flex items-center gap-4">
      {/* Notifications */}
      <button className="relative">
        <FaBell size={20} color="grey" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
          3
        </span>
      </button>

      {/* Settings */}
      <button>
        <FaCog size={20} color="grey" />
      </button>

      {/* Profile */}
      <div className="flex items-center gap-2">
        <img
          src="/profile-placeholder.png"
          alt="Profile"
          className="w-8 h-8 rounded-full border"
        />
        <span className="text-sm font-semibold text-gray-700">Name</span>
      </div>
    </div>
  </div>
);

}