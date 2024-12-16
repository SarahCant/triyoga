//SARAH + SOFIE
import NextAuth from "next-auth";
import { createUser, getUserByMail } from "./helpers";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        //check if user exists in the database
        const dbUser = await getUserByMail(credentials.email);
        if (!dbUser || !dbUser.password) {
          //return null if user not found or password is missing
          return null;
        }

        //check if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          dbUser.password
        );
        if (!passwordMatch) {
          //return null for incorrect password
          return null;
        }

        //return user object
        return {
          name: dbUser.name,
          email: dbUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session.fbUid) {
        // get user from the database
        let fbUser = await getUserByMail(session.user.email);
        // if user doesn't exist in the database, create new user
        if (!fbUser) {
          fbUser = await createUser({
            email: session.user.email,
            name: session.user.name,
          });
        }
        //add the Firebase UID to the session
        session.fbUid = fbUser.id;
      }
      return session;
    },
  },
});
