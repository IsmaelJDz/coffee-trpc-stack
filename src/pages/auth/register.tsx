import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthLayout } from "@/components/layout";
// import { useAppContext } from "@/context/Main/index";
import { CreateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserInput>();
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const { mutateAsync, error } = trpc.useMutation(["users.register-user"]);

  const onRegisterUser = async (data: CreateUserInput) => {
    const { name, email, password } = data;

    await mutateAsync({ name, email, password });

    setShowError(false);

    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    await signIn("credentials", { email, password });
  };

  console.log("errors", errors);

  return (
    <AuthLayout title="Ingresar">
      {error && <div>{error.message}</div>}
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <div>
          <div>
            <div>
              <h1>Crear cuenta</h1>
              {showError ? <p>Usuario ya existe</p> : null}
              {/* <Chip
                label="User already exists"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              /> */}
            </div>

            <div>
              <input type="text" placeholder="Nombre" {...register("name")} name="name" />
            </div>

            <div>
              <input type="email" placeholder="Email" {...register("email")} name="email" />
            </div>

            <div>
              <input type="password" placeholder="Contraseña" {...register("password")} name="password" />
            </div>
            <div>
              <button type="submit" className="circular-btn" disabled={isSubmitting}>
                Ingresar
              </button>
            </div>

            <div>
              <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : "/auth/login"} passHref>
                <a>Ya tienes cuenta?</a>
              </NextLink>
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
