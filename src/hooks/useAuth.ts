import { useSession } from "next-auth/react";

// TODO: change role string to enum

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  rolesName: string[];
}

// This hook is intended to be used only on pages with AuthorizationRequired strategy
export function useUser() {
  const { data } = useSession();

  return data?.user as User;
}
