import { FC, useReducer } from "react";

import { MainContext, MainReducer } from "./";

export interface MainState {
  data: undefined;
}

interface HomeProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const UI_INITIAL_STATE: MainState = {
  data: undefined
};

export const MainProvider: FC<HomeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, UI_INITIAL_STATE);

  const setSearchData = () => {
    dispatch({ type: "Data - Set ResponseData", payload: undefined });
  };

  return (
    <MainContext.Provider
      value={{
        ...state,
        setSearchData
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
