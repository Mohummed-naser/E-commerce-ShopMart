import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Page from "./../../../../../.next/types/routes.d";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "ayhaga",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "post",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "content-type": "application/json" },
          }
        );
        const payload = await response.json();
        console.log(payload);
        if ("token" in payload) {
          return {
            id: payload.token,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // token ==> next auth
      // user ==> user,token
      if (user) {
        (token.user = user.user), (token.token = user.token);
        // token.accessToken = (user as any).token;
      }
      return token; // token {user,token}
    },
    session: ({ session, token }) => {
      //token ==> next auth
      session.user = token.user;
      session.user.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
