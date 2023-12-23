"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import ConnectButton from "../ConnectButton/ConnectButton";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const Links = [
    {
      name: "Buckets",
      link: "/app",
    },

    {
      name: "Portfolio",
      link: "/app/portfolio",
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
          <div className="md:grid flex justify-between items-center md:grid-cols-3 gap-4 place-content-between w-full">
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
            <div className="hidden md:flex flex-row justify-center items-center text-primary">
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
                          <span className="w-2 h-1 bg-primary rounded-full"></span>
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
              <div className="hidden md:flex">
                <ConnectButton />
              </div>
              <div className="flex md:hidden" onClick={() => setIsOpen(true)}>
                <Bars3Icon className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-30"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen h-screen items-center justify-center">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="flex flex-col justify-start items-center text-left gap-6 w-full h-full rounded bg-secondary">
              <div className="flex flex-row justify-between items-center px-6 py-4 z-50 w-full">
                <div>
                  <Link className=" focus:outline-none" href={"/"}>
                    <Image
                      src={"/logo/TokenKrafters-White.png"}
                      alt="QuillAI Logo"
                      height={"250"}
                      width={"250"}
                    />
                  </Link>
                </div>
                <div onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <ul className="text-lg flex flex-col justify-center items-center text-white w-full">
                {Links.map((link, i) => {
                  return (
                    <Link
                      href={link.link}
                      className={`flex flex-row justify-start py-5 items-start px-8 gap-8 w-full ${
                        pathname === link.link
                          ? "bg-secondary  border-l-4 border-primary"
                          : "border-l-4 border-transparent"
                      }`}
                      key={i}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex flex-row justify-center items-center gap-4">
                        <h3 className="w-48 truncate">{link.name}</h3>
                      </div>
                    </Link>
                  );
                })}
              </ul>
              <div className="flex justify-start items-start w-full px-8">
                <ConnectButton />
              </div>
              {/* ... */}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Navbar;
