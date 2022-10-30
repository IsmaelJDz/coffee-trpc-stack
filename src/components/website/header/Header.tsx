import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import { useModal } from "@/hooks/index";
// import { Modal } from "@/components/ui/index";
import { FiMenu, FiX } from "react-icons/fi";

// TODO: Add dark/light mode

export const Header = () => {
  const router = useRouter();
  const [isOpen, toggleMenuState] = useState<boolean>(false);

  const handleClick = () => toggleMenuState(!isOpen);
  const closeMobileMenu = () => toggleMenuState(false);
  // const { show: showModal, toggle: toggleModal, close: closeModal } = useModal();

  const signIn = () => {
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-10 h-20 bg-white lg:relative shadow-header shadow-gray-200 lg:w-full lg:py-0 lg:px-5">
      <div className="flex items-center w-10/12 m-auto max-w-7xl justify-items-center">
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
              flex w-full
              lg:transition-none backdrop-blur supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75
              top-20 h-[calc(92vh+10px)] md:h-[calc(92vh+10px)]
              lg:items-center justify-center lg:h-0
              flex-col absolute lg:static lg:flex-row uppercase font-medium`}
          >
            <li className="border-b-2 py2 border-sky-500 lg:border-0" onClick={closeMobileMenu}>
              <a href="" className="table w-full px-8 my-8 text-center hover:text-primary">
                Inicio
              </a>
            </li>
            <Link href="/">
              <li className="border-b-2 py2 border-sky-500 lg:border-0">
                <a href="" className="table w-full px-8 my-8 text-center hover:text-primary">
                  Menú
                </a>
              </li>
            </Link>
            <li className="border-b-2 py2 border-sky-500 lg:border-0">
              <a href="" className="table w-full px-8 my-8 text-center hover:text-primary">
                Tiendas
              </a>
            </li>
            <li className="border-b-2 py2 border-sky-500 lg:border-0">
              <a href="" className="table w-full px-8 my-8 text-center hover:text-primary">
                Conócenos
              </a>
            </li>
          </ul>
        </nav>
        <div className="">
          <button
            className="py-2 mx-5 my-0 text-white transition-all border-0 bg-primary-green rounded-3xl px-7 hover:bg-light-green-A750"
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
