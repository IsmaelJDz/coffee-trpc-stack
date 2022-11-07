import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secretKokiriForest";

export function signJwt(id: number, email: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id, email }, SECRET, { expiresIn: "1d" });
}

export function verifyJwt<T>(token: string) {
  return jwt.verify(token, SECRET) as T;
}
