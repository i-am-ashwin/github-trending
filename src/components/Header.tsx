

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
    
  return (
 <header className="bg-white border-b-4 border-black">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-black">GitHub Trending</h1>
          <nav className="flex space-x-2 bg-lime-300 p-2 border-2 border-black">
            <Link href="/">
              <button
                className={`px-4 py-2 text-sm text-black font-bold border-2 border-black transition-all hover:bg-purple-200 cursor-pointer ${
                  pathname === '/' 
                    ? 'bg-yellow-300' 
                    : 'bg-white hover:bg-purple-100'
                }`}
              >
                All Repos
              </button>
            </Link>
            
            <Link href="/starred">
              <button
                className={`px-4 py-2 text-sm font-bold text-black border-2 border-black transition-all hover:bg-purple-200 cursor-pointer ${
                  pathname === '/starred' 
                    ? 'bg-yellow-300' 
                    : 'bg-white hover:bg-purple-100'
                }`}
              >
                Starred Repos
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
