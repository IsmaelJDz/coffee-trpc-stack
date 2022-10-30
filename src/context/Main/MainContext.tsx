import { createContext, useContext } from "react";

interface ContextProps {
  data: undefined;
  setSearchData: () => void;
}

// type TQuery = keyof AppRouter["_def"]["mutations"];

// type InferQueryOutput<TRouterKey extends TQuery> = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouterKey]>;

// export const MainContext = createContext<InferQueryOutput<"users.register-user">>({} as CreateUserInput);

export const MainContext = createContext({} as ContextProps);

export function useAppContext() {
  const context = useContext(MainContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}
