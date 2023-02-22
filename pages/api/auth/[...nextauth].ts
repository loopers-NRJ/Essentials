import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../../../database/users";
export const getAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions => ({
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
    signIn: async ({ user }: any) => {
      if (!user.email || !user.name || !user.image)
        return Promise.reject("Credentials not found");
      let savedUser: any = await findUserByEmail(user.email);
      if (!savedUser) {
        savedUser = await createUser({
          email: user.email,
          name: user.name,
          image: user.image,
          provider: user.provider || "facebook",
        });
        if (savedUser instanceof Error)
          return Promise.reject(savedUser.message);
      }
      const token = jwt.sign(
        { id: savedUser.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "30d",
        }
      );
      setCookie({ res }, "auth-token", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return true;
    },
  },
});

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(getAuthOptions(req, res))(req, res);
