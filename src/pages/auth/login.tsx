import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AuthLayout } from "@/components/layout";

type InputsForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<InputsForm>();
  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  const onLoginUser = async (data: InputsForm) => {
    setShowError(false);

    await signIn("credentials", {
      email: data.email,
      password: data.password
    });
  };

  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov);
    });
  }, []);

  console.log("errors", errors);

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <div>
          <div>
            <div>
              <h1>Iniciar sesión</h1>
              {showError ? <p>Usuario ya existe</p> : null}
              {/* {showError && (
                <Chip
                  label="User not found"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              )} */}
              {/* <Chip
                label="User not found"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              /> */}
            </div>

            <div>
              <input type={"email"} placeholder={"Email"} {...register("email")} />
            </div>

            <div>
              <input type="password" placeholder="Contrasena" {...register("password")} />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Ingresar
              </button>
            </div>

            <div>
              <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : "/auth/register"} passHref>
                <a>No tienes cuenta?</a>
              </NextLink>
            </div>

            <div>
              {Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials") return <div key="credentials"></div>;

                return (
                  <button
                    className="px-2 flex flex-col bg-slate-300 w-full py-2 rounded-md text-white text-sm font-medium items-center my-2"
                    key={provider.id}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
