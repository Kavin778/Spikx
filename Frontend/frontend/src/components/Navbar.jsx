import React from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon,
  TvIcon,
  FilmIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navItems = [
    { name: 'Home', icon: HomeIcon, href: '#' },
    { name: 'Movies', icon: FilmIcon, href: '#' },
    { name: 'TV Shows', icon: TvIcon, href: '#' },
    { name: 'Watch Party', icon: UserGroupIcon, href: '#' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(()=>{
        const handleScroll = () =>{
            setIsScrolled(window.scrollY > 0);
        }
        window.addEventListener('scroll',handleScroll);
        return ()=> window.removeEventListener('scroll',handleScroll)
  },[])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent max-w-8xl">
      <div
        className={`mx-10 px-4  ${isScrolled ? 'rounded-b-xl backdrop-blur-xl ' : 'bg-transparent'} transition-all duration-300`}
      >
        <div className="flex space-x-8 items-center h-18">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-semibold text-white">
              <span className="text-white">Spik</span>
              <span className="text-green-600 text-3xl font-bold">-X</span>
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2 rounded-md text-lg font-semibold text-gray-300 hover:text-black hover:bg-slate-300 transition-all duration-200"
              >
                <item.icon className="size-6 mr-2 group-hover:text-black transition-colors" />
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center">
            <button className="flex items-center px-3 py-2 rounded-md text-lg font-medium text-gray-300 hover:text-black hover:bg-slate-300 transition-all duration-200">
              <ArrowLeftStartOnRectangleIcon className="size-6 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
