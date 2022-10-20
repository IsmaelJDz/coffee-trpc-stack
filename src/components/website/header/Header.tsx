import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useModal } from "@/hooks/index";
import { Modal } from "@/components/ui/index";
import { FiMenu, FiX } from "react-icons/fi";

// TODO: Add dark/light mode

export const Header = () => {
  const router = useRouter();
  const [isOpen, toggleMenuState] = useState<boolean>(false);

  const handleClick = () => toggleMenuState(!isOpen);
  const closeMobileMenu = () => toggleMenuState(false);
  const { show: showModal, toggle: toggleModal, close: closeModal } = useModal();

  const signIn = () => {
    router.push("/signin-and-signup");
  };

  return (
    <header className="sticky lg:relative top-0 z-10 h-20 bg-white shadow-header shadow-gray-200 lg:w-full lg:py-0 lg:px-5">
      <div className="flex w-10/12 m-auto items-center max-w-7xl justify-items-center">
        <Link href="/">
          <a onClick={() => {}} className="mr-auto">
            <figure className="m-0">
              <Image src="/images/logo.png" alt="logo" width="75px" height="75px" />
            </figure>
          </a>
        </Link>

        <nav>
          <ul
            className={`
              ${isOpen ? "left-0 transition-all duration-300" : "-left-full transition-all duration-300"}
              flex w-full bg-slate-400
              lg:transition-none
              top-20 h-[calc(92vh+10px)] md:h-[calc(92vh+10px)]
              lg:items-center justify-center lg:h-0
              flex-col absolute lg:static lg:flex-row uppercase font-medium`}
          >
            <li className="py2 border-b-2 border-sky-500 lg:border-0" onClick={closeMobileMenu}>
              <a href="" className="text-center px-8 w-full table hover:text-primary my-8">
                Inicio
              </a>
            </li>
            <Link href="/">
              <li className="py2 border-b-2 border-sky-500 lg:border-0">
                <a href="" className="text-center px-8 w-full table hover:text-primary my-8">
                  Menú
                </a>
              </li>
            </Link>
            <li className="py2 border-b-2 border-sky-500 lg:border-0">
              <a href="" className="text-center px-8 w-full table hover:text-primary my-8">
                Tiendas
              </a>
            </li>
            <li className="py2 border-b-2 border-sky-500 lg:border-0">
              <a href="" className="text-center px-8 w-full table hover:text-primary my-8">
                Conócenos
              </a>
            </li>
          </ul>
        </nav>
        <div className="">
          <button
            className="my-0 mx-5 bg-primary-green border-0 rounded-3xl py-2 px-7 text-white hover:bg-light-green-A750 transition-all"
            onClick={() => signIn()}
          >
            Iniciar sesión
          </button>
        </div>
        {/* <DarkLightMode /> */}
        {/* <Modal size="md" show={showModal} onClose={closeModal}>
          <h3 className="">Do you want to choose names?</h3>
        </Modal>
        <button onClick={toggleModal}>Click</button> */}
        <div className="block transition-all lg:hidden" onClick={handleClick}>
          {isOpen ? <FiX size={28} className="cursor-pointer" /> : <FiMenu size={28} className="cursor-pointer" />}
        </div>
      </div>
    </header>
  );
};
