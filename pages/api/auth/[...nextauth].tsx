import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { FirebaseAdapter } from '@next-auth/firebase-adapter'
import { firestore } from '../../../components/utils/firebase'
import { getUserId } from '../../../components/utils/users'
let userId
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(firestore),

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,

  callbacks: {
    // Add userId to session
    async session(session, token) {
      if (userId === undefined) {
        userId = await getUserId(session.accessToken as string)
      }
      session.userId = userId
      return session
    },
  },
})
