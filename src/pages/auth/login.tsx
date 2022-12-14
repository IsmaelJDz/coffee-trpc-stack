import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { AuthLayout } from "@/components/layout";
import { Alert } from "@/components/ui/alert";
import { AdvancedButton, SocialButtons } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { AdvancedInput } from "@/components/ui/input";
import { ACCESS_DENIED } from "@/constants/common";
import { loginSchema } from "@/schema/frontend/login";
// import { AdvancedSpacing } from "@/components/ui/spacing";
// import useRolePermission from '@hooks/global/useRolePermission';

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
  } = useForm<InputsForm>({
    resolver: yupResolver(loginSchema()),
    mode: "onTouched"
  });
  const [showError, setShowError] = useState(false);
  // useRolePermission({ roles: [CATEGORY_MANAGEMENT_ADMIN, CATEGORY_MANAGEMENT_ASSETS_ADMIN], redirect: '/' });

  const onLoginUser = async (data: InputsForm) => {
    setShowError(false);

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })
      .then(data => {
        // setShowError(true);
        // setTimeout(() => {
        //   setShowError(false);
        // }, 3000);

        if (data?.status === 200 && data?.ok) {
          router.push("/");
        }

        if (data?.status === 401 && !data?.ok) {
          toast.error(ACCESS_DENIED, {
            duration: 5000
          });
        }

        // router.push("/");
      })
      .catch(errorResponse => {
        console.error(errorResponse);
      });
  };

  return (
    <AuthLayout title="Ingresar">
      <div className="flex w-full">
        <div className="relative hidden h-screen sm:w-full xl:block">
          <Image src="/images/coffee2.jpeg" priority className="" layout="fill" objectFit="fill" />
        </div>

        <div className="flex flex-col items-center justify-center w-full h-screen">
          {/* <span className="flex w-3 h-3">
            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
            <span className="relative inline-flex w-3 h-3 rounded-full bg-sky-500"></span>
          </span> */}
          <div className="mb-4 text-xl font-bold text-primary">
            <h1>Iniciar sesi??n</h1>
            {showError ? <Alert message="El usuario ya existe" autoHidden type="error" /> : null}
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
          <SocialButtons />

          <div className="w-2/4 my-4">
            <Divider message="Or" />
          </div>

          <div className="w-2/4">
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
              {/* <AdvancedSpacing size={2} /> */}

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

              <div className="flex flex-row justify-between mb-5">
                <div className="flex flex-col w-full">
                  <label htmlFor="description" className="flex mb-2 font-semibold">
                    Password
                  </label>
                  <AdvancedInput
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                    invalid={!!errors.password?.message}
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* <Permission roles={[SUPER_ADMIN, DISCOUNT_CODES_ADMIN]}>
                {addNewCategory && <FiPlusCircle size="16" className="absolute w-8 h-8 text-primary centerIcon" />}
              </Permission> */}

              <div>
                <AdvancedButton
                  color="primary"
                  type="submit"
                  text="Ingresar"
                  className="w-32"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  spinnerText={"Ingresando..."}
                />
              </div>

              <div className="flex justify-between mt-3">
                <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : "/auth/register"} passHref>
                  <a>No tienes cuenta?</a>
                </NextLink>
                <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : "/auth/register"} passHref>
                  <a>Olvidaste tu password?</a>
                </NextLink>
              </div>
            </form>
          </div>
        </div>
      </div>
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
