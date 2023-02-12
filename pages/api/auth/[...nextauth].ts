import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { createUser, findUser } from "../../../services/database";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
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
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
