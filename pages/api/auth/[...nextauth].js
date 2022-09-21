import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/Users";
import { compare } from "bcrypt";

dbConnect();
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await User.findOne({ username: credentials.username });
        if (user) {
          const isValid = await compare(credentials.password, user.hash);
          if (isValid) {
            return user;
          } else {
            throw new Error("Invalid username or password");
          }
        } else {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
    maxAge: 3 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userData = {
          username: user.username,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          verified: user.verified,
        };
        token.userData = userData;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if (token) {
        session.userData = token.userData;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/userLogin",
    newUser: "/auth/register",
  },
});
