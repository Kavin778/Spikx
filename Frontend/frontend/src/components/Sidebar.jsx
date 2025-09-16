import React, { useState } from 'react';

import {
  HomeIcon,
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon,
  TvIcon,
  FilmIcon,
} from '@heroicons/react/16/solid';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`fixed flex flex-col h-screen z-50 bg-black/70 backdrop-blur-xl bg-opacity-90 text-white transition-all duration-300 ease-in-out ${expanded ? 'w-64 items-center' : 'w-20 items-center'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex mb-18 items-center h-24 justify-center">
        <h1
          className={`text-2xl font-bold whitespace-nowrap overflow-hidden ${expanded ? 'w-32 items-center' : 'w-0'}`}
        >
          Spikx
        </h1>
      </div>

      <nav className="flex-1 p-2">
        <ul className="space-y-6 text-xl text-green-600">
          <li>
            <a href="#" className="flex items-cente p-2 hover:text-white">
              <HomeIcon className="size-7" />
              <span className={`ml-2 font-bold overflow-hidden ${expanded ? 'w-32' : 'w-0'}`}>
                Home
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-cente p-2 hover:text-white">
              <FilmIcon className="size-7" />
              <span className={`ml-2 font-bold overflow-hidden ${expanded ? 'w-32' : 'w-0'}`}>
                Movies
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-cente p-2 hover:text-white">
              <TvIcon className="size-7" />
              <span className={`ml-2 font-bold overflow-hidden ${expanded ? 'w-32' : 'w-0'}`}>
                TvShows
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-cente p-2 hover:text-white">
              <UserGroupIcon className="size-7" />
              <span className={`ml-2 font-bold overflow-hidden ${expanded ? 'w-32' : 'w-0'}`}>
                Watchparty
              </span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 hover:text-white ">
              <ArrowLeftStartOnRectangleIcon className="size-7" />
              <span
                className={`ml-2 font-bold overflow-hidden hover:z-50 ${expanded ? 'w-32' : 'w-0'}`}
              >
                Logout
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
