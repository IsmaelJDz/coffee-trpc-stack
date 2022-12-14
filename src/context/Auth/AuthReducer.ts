import { ISetUser } from "@/interfaces/index";

import { AuthState } from "./";

type AuthActionType = { type: "[Auth] - Login"; payload: ISetUser } | { type: "[Auth] - Logout" };

export const AuthReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case "[Auth] - Login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      };

    case "[Auth] - Logout":
      return {
        ...state,
        isLoggedIn: false,
        user: undefined
      };

    default:
      return state;
  }
};
