import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.email = user.mail;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
      session.user.email = token.email;
      return session;
    },
    async signIn(user, account, profile) {
      console.log("---------- signIn ----------");

      console.log(user, account, profile);

      return true;
    },
  },
});
