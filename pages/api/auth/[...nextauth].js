import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import mongodbConnect from "../../../database/dbConn";
import Users from "../../../model/auth";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req){
        await mongodbConnect();
        //check user existance
        const data = await Users.findOne({email: credentials.email});
        if(!data){
          throw new Error("No user found!");
        };
        //compare function
        const checkPassword = await compare(credentials.password, data.password);
        //incorrect password
        if(!checkPassword || data.email !== credentials.email){
          throw new Error("invalid username or password!");
        }
        return data;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return {...token, ...user};
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
  secret: process.env.AUTH_SECRET
});