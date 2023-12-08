"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import ConnectButton from "../ConnectButton/ConnectButton";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [open, setOpen] = useState(false);

  const Links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Buckets",
      link: "/app",
    },
    {
      name: "Raffle",
      link: "/app/raffle",
    },
  ];

  const pathname = usePathname();
  //navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change Background
    window.addEventListener("scroll", changeBackground);
  }, [navbar]);
  return (
    <>
      <div className="w-full">
        <div
          className={
            navbar
              ? "nav-scroll bg-secondary fixed z-50 flex w-full flex-col items-center justify-between px-6 py-4 shadow-md lg:px-24"
              : "fixed z-20 flex w-full flex-col items-center justify-between px-6 py-4 lg:px-24"
          }
        >
          <div className="grid grid-cols-3 gap-4 place-content-between w-full">
            <Link
              className="flex flex-row justify-start items-center gap-2"
              href={"/"}
            >
              <Image
                src={"/logo/TokenKrafters-Teal.png"}
                alt="TokenKrafters Logo"
                height={"250"}
                width={"250"}
              />
            </Link>
            <div className="flex flex-row justify-center items-center text-primary">
              <ul className="flex flex-row justify-center items-center gap-12 text-lg">
                {Links.map((link) => {
                  return (
                    <li key={link.name}>
                      <Link
                        className="flex flex-col justify-center items-center gap-1"
                        href={link.link}
                      >
                        {link.name}
                        {pathname === link.link ? (
                          <span className="w-2 h-1 bg-white rounded-full"></span>
                        ) : (
                          <span className="w-2 h-1 bg-transparent rounded-full"></span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-end items-center">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
