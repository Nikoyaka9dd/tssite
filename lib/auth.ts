import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// 環境変数から管理者アカウント情報を取得
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ADMIN_USERNAME"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ADMIN_PASSWORD"

// デバッグ用のログ
console.log("Auth config loaded with:", {
  ADMIN_USERNAME_SET: ADMIN_USERNAME ? "Yes" : "No",
  ADMIN_PASSWORD_SET: ADMIN_PASSWORD ? "Yes (hidden)" : "No",
  NODE_ENV: process.env.NODE_ENV,
})

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
          console.log("Missing credentials")
          return null
        }

        // デバッグ用のログ
        console.log("Login attempt:", {
          providedUsername: credentials.username,
          usernameMatch: credentials.username === ADMIN_USERNAME,
          passwordMatch: credentials.password === ADMIN_PASSWORD,
        })

        // 環境変数から取得した認証情報と比較
        if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
          return {
            id: "1",
            name: "管理者",
            email: "admin@example.com",
          }
        }

        console.log("Invalid credentials")
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
  debug: true, // デバッグモードを有効化
}
