import { Cloud, Search, MapPin } from "lucide-react";
export function Header() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-400 to-gray-600">
      <header className="max-w-10xl shadow-md px-4 py-4 backdrop-blur-md h-20">
        <div className="flex items-center justify-between mx-auto ">
          {/* logo + heading */}
          <div className="flex items-center space-x-3">
            <Cloud className="h-10 w-10 text-black" />
            <h1 className="text-black text-3xl font-bold">CloudCast</h1>
          </div>

          {/* searchbar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a city..."
                className="w-full px-4 py-2 rounded-full bg-white/20 border border-white/30 
                           text-black placeholder-white/70 focus:outline-none focus:ring-2 
                           focus:ring-white/50"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-white/30 hover:bg-white/70 rounded-full px-4 py-2 ">
            <MapPin className="h-7 w-7 text-black" />
            <span className="text-2xl font-bold">Current Location</span>
          </button>
        </div>
      </header>
    </div>
  );
}
