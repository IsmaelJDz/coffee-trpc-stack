import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle, FaSpotify } from "react-icons/fa";

type ResponseProviders = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type ProvidersProps = {
  credentials: ResponseProviders;
  google: ResponseProviders;
  spotify: ResponseProviders;
  github: ResponseProviders;
};

export const SocialButtons = () => {
  const [providers, setProviders] = useState<ProvidersProps | {}>({});

  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov || {});
    });
  }, []);

  return (
    <div className="w-2/4 flex justify-center items-center mt-6 flex-col">
      {Object.values(providers).map((provider: ResponseProviders) => {
        if (provider.id === "credentials") return <div key="credentials"></div>;

        return (
          <button
            className="border border-gray-500 w-full flex justify-center items-center py-2 rounded-md mb-2 hover:bg-gray-200 hover:border-blue-200"
            type="submit"
            key={provider.id}
            onClick={() => signIn(provider.id)}
          >
            <div className="flex justify-center items-center">
              {provider.id === "google" && <FaGoogle size="21" className="text-blue-600 mr-2" />}
              {provider.id === "github" && <FaGithub size="21" className="text-black mr-2" />}
              {provider.id === "spotify" && <FaSpotify size="21" className="text-green-600 mr-2" />}
            </div>
            {provider.name}
          </button>
        );
      })}
    </div>
  );
};
