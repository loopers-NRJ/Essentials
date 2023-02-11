import { Session } from "inspector";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { createUser, findUser } from "../../../services/database";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    signIn: async ({ user }) => {
      if (!user.email || !user.name || !user.image)
        return Promise.reject("Credentials not found");
      let savedUser = await findUser(user.email);
      if (!savedUser) {
        savedUser = await createUser({
          email: user.email,
          name: user.name,
          image: user.image,
          provider: "google",
          orders: [],
        });
      }
      return Promise.resolve(true);
    },
    session: async ({ session }: { session: any }) => {
      if (session.user?.email) {
        const user = await findUser(session.user?.email);
        session.user.orders = user?.orders;
        session.user.id = user?.id;
        session.user.provider = user?.provider || "google";
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
