import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// This function should be replaced with your actual authentication logic
async function verifyCredentials(credentials) {
  // Here you would typically check the credentials against your database
  // For this example, we're using a simple check
  if (
    credentials.email === "user@example.com" &&
    credentials.password === "password"
  ) {
    return {
      id: "1",
      name: "Test User",
      email: "user@example.com",
    };
  }
  return null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        // Verify the credentials
        const user = await verifyCredentials(credentials);
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
    async signIn(user, account, profile) {
      console.log("---------- signIn ----------");
      console.log(user, account, profile);
      return true;
    },
  },
  pages: {
    signIn: "/profile",
  },
});
