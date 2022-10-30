import { MainState } from ".";

type HomeActionType =
  | { type: "Data - Set ResponseData"; payload: undefined }
  | { type: "Loading - Set Loading"; payload: boolean };

export const MainReducer = (state: MainState, action: HomeActionType): MainState => {
  switch (action.type) {
    case "Data - Set ResponseData":
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
};
