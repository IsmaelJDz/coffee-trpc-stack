import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";

import { checkEmailPassword, verifyOauthUser } from "@/server/callbacks-server/user";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || ""
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    Credentials({
      name: "Custom Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        }
      },
      async authorize(credentials, req) {
        return await checkEmailPassword(credentials!.email, credentials!.password);
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register"
  },
  session: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    strategy: "jwt",
    updateAge: 1000 * 60 * 60 * 24 // 1 day
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("token 1", token); // eslint-disable-line
      console.log("account 1", account);
      console.log("user 1", user); // eslint-disable-line

      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
            // Create o verify user exists in your database
            token.user = await verifyOauthUser(user?.email || "", user?.name || "");
            break;

          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log("token 2", token); // eslint-disable-line
      console.log("session 1", session);
      console.log("user 1", user); // eslint-disable-line

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
  }
});
