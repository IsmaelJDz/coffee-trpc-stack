// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   password?: string;
//   role: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

export type ISetUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
};
