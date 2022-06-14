import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font border-2">
        <div className="container px-5 mt-20 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
            <a className="flex title-font font-medium items-center md:justify-end justify-center text-gray-900">
              <Link href="/">
                <img
                  src="/Codeswear-brand.png"
                  width="180"
                  className="mx-5 cursor-pointer"
                />
              </Link>
            </a>
            <p className="mt-2 text-sm text-gray-500">
              A perfect place for the coders to wear the code that they write
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Shop
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/tshirts">
                    <a className="text-gray-600 hover:text-gray-800">Tshirts</a>
                  </Link>
                </li>
                <li>
                  <Link href="/hoodies">
                    <a className="text-gray-600 hover:text-gray-800">Hoodies</a>
                  </Link>
                </li>
                <li>
                  <Link href="/mugs">
                    <a className="text-gray-600 hover:text-gray-800">Mugs</a>
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2020 Codeswear — All rights reserved
              <a
                href="https://twitter.com/knyttneve"
                rel="noopener noreferrer"
                className="text-gray-600 ml-1"
                target="_blank"
              >
                @himeshmaniyar
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
