import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// 管理者アカウント情報（実際のプロダクションでは環境変数を使用してください）
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password123"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "ユーザー名", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // 簡易的な認証（実際のプロダクションではデータベースを使用してください）
        if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
          return {
            id: "1",
            name: "管理者",
            email: "admin@example.com",
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-for-development",
}
