import Image from "next/image";
import NextLink from "next/link";
import React, { useState } from "react";

import { useAuthContext } from "@/context/index";
import { IUser } from "@/interfaces/index";

type AvatarProps = {
  user: IUser;
};

export const Avatar = ({ user }: AvatarProps) => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const { logoutUser } = useAuthContext();

  const toggleProfileHidden = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="relative cursor-pointer">
      <Image
        width="40px"
        height="40px"
        className="w-10 h-10 rounded-full"
        src="/images/default-profile.png"
        alt="Avatar"
        onClick={toggleProfileHidden}
      />

      {showProfile ? (
        <div className="absolute z-20 flex flex-col justify-between p-4 bg-white border border-gray-900 cursor-default w-72 sm:w-60 h-72 top-28 right-5 sm:top-16 sm:right-0">
          <div className="flex flex-col">
            <p className="text-center">{user.name}</p>
            <p className="text-center">{user.email}</p>
            <NextLink passHref href="/user-profile">
              <a className="p-4 cursor-pointer text-end">Mi profile</a>
            </NextLink>
          </div>
          <div className="flex items-end justify-end">
            <button onClick={logoutUser}>Logout</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
