import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import Link from 'next/link';

const links = [
  {
    name: 'Explore',
    href: '/explore',
    isExternal: false, 
  },
  {
    name: 'Rasionalisasi',
    href: 'https://upsnm-smansaka.web.app/',
    isExternal: true, 
  },
  {
    name: 'Pengenalan Panitia',
    href: '/intro',
    isExternal: false, 
  },
  {
    name: 'Jadwal dan Acara',
    href: '/schedule',
    isExternal: false, 
  },
  {
    name: 'Contact Person',
    href: '/contact',
    isExternal: false, 
  },
];

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const router = useRouter(); 
  const handleButtonClicked = (url : string, isEksternal = false) => () => {
    setNavbarOpen(false);
    if (!isEksternal){ 
      router.push(`${url}`);
    }
    else {
      window.location.assign(url);
    }
    
  };
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-2 py-[1px] bg-gradient-to-r from-purple-100 to-white-100 mb-3 fixed top-0 z-20 w-screen">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-lg font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-gray-700"
              >
                <img src='./images/univday-logo.png' style={{height: '46px'}} />
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none my-1 px-3 py-1 border-solid border-8 border-gray-700 rounded-full  block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
                (navbarOpen ? ' flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {
                links.map((link) => (
                  <li className="nav-item" key={link.name}>
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-500 hover:opacity-75"
                      onClick={handleButtonClicked(link.href, link.isExternal)}
                    >
                      <span className="ml-2 cursor-pointer text-sm">{link.name}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
