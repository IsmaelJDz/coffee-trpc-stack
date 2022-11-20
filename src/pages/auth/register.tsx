import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { AuthLayout } from "@/components/layout";
import { Alert } from "@/components/ui/alert";
import { AdvancedInput } from "@/components/ui/input";
import { PasswordRules } from "@/components/ui/password/PasswordRules";
import { getInitialValues, registerSchema } from "@/schema/frontend/register";
import { CreateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
// import toast from "react-hot-toast";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserInput>({
    resolver: yupResolver(registerSchema()),
    mode: "onTouched",
    defaultValues: getInitialValues()
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const { mutate } = trpc.useMutation(["users.register-user"]);
  const passwordValue = watch("password");

  const onRegisterUser = async (data: CreateUserInput) => {
    const { name, email, password } = data;

    setShowError(false);

    mutate(
      { name, email, password },
      {
        onSuccess: async ({ user }) => {
          if (user) {
            await signIn("credentials", { email, password });
          }
        },
        onError: errorMessage => {
          console.log("errorMessage", errorMessage.message);

          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        }
      }
    );
  };

  const onShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <AuthLayout title="Ingresar">
      {/* {error && <div>{error.message}</div>} */}
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <div>
          <div>
            <div>
              <h1>Crear cuenta</h1>
              {/* {showError ? <p>Usuario ya existe</p> : null} */}
              {showError ? <Alert message="El usuario ya existe" autoHidden type="error" /> : null}
              {/* <Chip
                label="User already exists"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              /> */}
            </div>

            {/* <div>
              <input type="text" placeholder="Nombre" {...register("name")} name="name" />
            </div> */}
            <div className="flex flex-row justify-between mb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="description" className="flex mb-2 font-semibold">
                  Name
                </label>
                <AdvancedInput
                  {...register("name")}
                  error={errors.name?.message}
                  invalid={!!errors.name?.message}
                  id="name"
                  name="name"
                  placeholder="Name"
                />
              </div>
            </div>

            {/* <div>
              <input type="email" placeholder="Email" {...register("email")} name="email" />
            </div> */}

            <div className="flex flex-row justify-between mb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="description" className="flex mb-2 font-semibold">
                  Email
                </label>
                <AdvancedInput
                  {...register("email")}
                  error={errors.email?.message}
                  invalid={!!errors.email?.message}
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
            </div>

            <AdvancedInput
              {...register("password")}
              error={errors.password?.message}
              invalid={!!errors.password?.message}
              id="password"
              name="password"
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              label={
                <>
                  <span>Contraseña</span>
                  <PasswordRules password={passwordValue} />
                </>
              }
              endIcon={
                isPasswordVisible ? (
                  <AiFillEye size="21" className="text-gray-600" onClick={onShowPassword} />
                ) : (
                  <AiFillEyeInvisible size="21" className="text-gray-600" onClick={onShowPassword} />
                )
              }
            />
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
